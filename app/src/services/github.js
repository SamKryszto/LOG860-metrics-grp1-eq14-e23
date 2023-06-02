const util = require("util");
const axios = require("axios");
const {
    requests,
    DEFAULT_OWNER,
    DEFAULT_REPO,
    BASE_QUERY,
} = require("../strings");
const { diffDates } = require("../utils");

async function githubRequest(
    subQuery,
    owner = DEFAULT_OWNER,
    name = DEFAULT_REPO,
    ...params
) {
    try {
        const headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        };
        console.log({ BASE_QUERY });
        subQuery = util.format(subQuery, ...params);
        const query = util.format(BASE_QUERY, name, owner, subQuery);
        console.log({ query });
        const { data } = await axios.post(
            "https://api.github.com/graphql",
            { query },
            { headers }
        );
        return data;
    } catch (e) {
        console.log(e);
    }
}

// ----------------
// KANBAN METRICS
// ----------------

async function getTaskLeadTime(repo, owner, id) {
    const data = await githubRequest(
        requests.GET_TASK_LEAD_TIME,
        owner,
        repo,
        id
    );

    const createdAt = new Date(data.data.repository.issue.createdAt);

    if (data.data.repository.issue.closedAt === null) {
        return "The task has not been closed yet.";
    } else {
        const closedAt = new Date(data.data.repository.issue.closedAt);
        const timeDifference = closedAt.getTime() - createdAt.getTime();

        const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingTimeInHours = timeDifference % (1000 * 60 * 60 * 24);
        const totalHours = Math.floor(remainingTimeInHours / (1000 * 60 * 60));
        const remainingTimeInMinutes = remainingTimeInHours % (1000 * 60 * 60);
        const totalMinutes = Math.floor(remainingTimeInMinutes / (1000 * 60));

        const msg = `Lead time for task ${id}: ${totalDays} days, ${totalHours} hours and ${totalMinutes} minutes.`;

        return msg;
    }
}

async function getLeadTime(repo, owner, start, end) {
    const data = await githubRequest(requests.GET_LEAD_TIME, owner, repo);
    console.log(data);

    const issues = data.data.repository.issues.nodes;

    const startParam = new Date(start); // Specify your start parameter
    const endParam = new Date(end); // Specify your end parameter

    const result = issues
        .filter((issue) => {
            const createdAt = new Date(issue.createdAt);
            return createdAt >= startParam && createdAt <= endParam;
        })
        .map((issue) => {
            const createdAt = new Date(issue.createdAt);
            const closedAt = new Date(issue.closedAt);
            const timeDiff = closedAt - createdAt;

            const minutes = Math.floor(timeDiff / 1000 / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            return `Issue ${issue.number}: ${days} days, ${hours % 24} hours, ${
                minutes % 60
            } minutes`;
        })
        .join("<br>");
    return result;
}

async function getActiveTasksCount(repo, owner, columnName) {
    const data = await githubRequest(
        requests.GET_ACTIVE_TASKS_COUNT,
        owner,
        repo
    );
    const nodes = data.data.repository.projectsV2.nodes;

    const columnCounts = {};

    nodes.forEach((node) => {
        const projectItems = node.view.project.items.nodes;
        projectItems.forEach((item) => {
            const fieldValue = item.fieldValues.edges.find(
                (edge) => edge.node.name === columnName
            );
            if (fieldValue && fieldValue.node.name) {
                const value = fieldValue.node.name;
                if (columnCounts[value]) {
                    columnCounts[value]++;
                } else {
                    columnCounts[value] = 1;
                }
            }
        });
    });

    return `Status Counts for column '${columnName}': ${columnCounts[columnName] ?? 0}`;
}

async function getCompletedTasksCount(repo, owner, start, end) {
    const data = await githubRequest(
        requests.GET_COMPLETED_TASKS_COUNT,
        owner,
        repo
    );

    const issues = data.data.repository.issues.nodes;
    const startParam = new Date(start); // Specify your start parameter
    const endParam = new Date(end); // Specify your end parameter

    const filteredIssues = issues.filter((issue) => {
        const createdAt = new Date(issue.createdAt);
        return createdAt >= startParam && createdAt <= endParam;
    });

    const issueCount = filteredIssues.length;
    return `There were ${issueCount} issue(s) completed within ${start} and ${end}`;
}

// ----------------
// PULL REQUEST METRICS
// ----------------

async function getPRCount(owner, repo) {
    const { data } = await githubRequest(requests.GET_PR_COUNT, owner, repo);
    const { totalCount } = data.repository.pullRequests;
    return `Number of pull requests: ${totalCount}.`;
}

async function getPRState(owner, repo, id) {
    const { data } = await githubRequest(
        requests.GET_PR_STATE,
        owner,
        repo,
        id
    );
    const { state } = data.repository.pullRequest;
    return `State of pull request ${id}: ${state}.`;
}

async function getPRMergeTime(owner, repo, id) {
    const { data } = await githubRequest(
        requests.GET_PR_MERGE_TIME,
        owner,
        repo,
        id
    );
    const { createdAt, mergedAt } = data.repository.pullRequest;
    const createdAtTime = new Date(createdAt).getTime();
    const mergedAtTime = new Date(mergedAt).getTime();
    const { days, hours, minutes } = diffDates(createdAtTime, mergedAtTime);
    return `Merge time for pull request ${id}: ${days} days, ${hours} hours, ${minutes} minutes.`;
}

async function getPRCommentsCount(owner, repo, id) {
    const { data } = await githubRequest(
        requests.GET_PR_COMMENTS_COUNT,
        owner,
        repo,
        id
    );
    const { totalCount } = data.repository.pullRequest.comments;
    return `Number of comments for pull request ${id}: ${totalCount}.`;
}

async function getPRReviewers(owner, repo, id) {
    const { data } = await githubRequest(
        requests.GET_PR_REVIEWERS,
        owner,
        repo,
        id
    );
    const reviewers = data.repository.pullRequest.reviewRequests.nodes.map(
        (rq) => rq.requestedReviewer.login
    );
    return `Reviewers for pull request ${id}: ${reviewers.join(", ")}.`;
}

// ----------------
// VISUALIZATION METRICS
// ----------------

// NOTE: USED IN CRONJOB
async function getSnapshot() {
    // TODO: implement
    const data = await githubRequest(requests.GET_SNAPSHOT);
    return {};
}

module.exports = {
    getTaskLeadTime,
    getLeadTime,
    getActiveTasksCount,
    getCompletedTasksCount,
    getPRCount,
    getPRState,
    getPRMergeTime,
    getPRCommentsCount,
    getPRReviewers,
    getSnapshot,
};
