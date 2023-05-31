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
        subQuery = util.format(subQuery, ...params);
        query = util.format(BASE_QUERY, name, owner, subQuery);
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

async function getTaskLeadTime(id) {
    const data = await githubRequest(requests.GET_TASK_LEAD_TIME, id);
    // TODO: change TEST_FORMATTED string, parse result
    return {};
}

async function getLeadTime() {
    const data = await githubRequest(requests.GET_LEAD_TIME);
    // TODO: change TEST string, parse result
    return {};
}

async function getActiveTasksCount(column) {
    const data = await githubRequest(requests.GET_ACTIVE_TASKS_COUNT, column);
    // TODO: change TEST string, parse result
    return {};
}

async function getCompletedTasksCount(column) {
    const data = await githubRequest(
        requests.GET_COMPLETED_TASKS_COUNT,
        column
    );
    // TODO: change TEST string, parse result
    return {};
}

// ----------------
// PULL REQUEST METRICS
// ----------------

async function getPRCount(owner, repo) {
    // TODO: rename function/request string and implement
    const { data } = await githubRequest(requests.GET_PR_COUNT, owner, repo);
    const { totalCount } = data.repository.pullRequests;
    return `Number of pull requests: ${totalCount}.`;
}

async function getPRState(owner, repo, id) {
    // TODO: rename function/request string and implement
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
    // TODO: rename function/request string and implement
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
    // TODO: rename function/request string and implement
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
    // TODO: rename function/request string and implement
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
