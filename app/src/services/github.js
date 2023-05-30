const util = require("util");
const axios = require("axios");
const { requests } = require("../strings");

async function githubRequest(query, ...params) {
    try {
        const headers = {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        };
        query = util.format(query, ...params);
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
    
    const data = await githubRequest(requests.GET_TASK_LEAD_TIME, repo, owner, id);    
    
    const createdAt = new Date(data.data.repository.issue.createdAt);
    
    if (data.data.repository.issue.closedAt === null){
        return "The task has not been closed yet."
    }
    else {
        const closedAt = new Date(data.data.repository.issue.closedAt);
        const timeDifference = closedAt.getTime() - createdAt.getTime();


        const totalDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const remainingTimeInHours = timeDifference % (1000 * 60 * 60 * 24);
        const totalHours = Math.floor(remainingTimeInHours / (1000 * 60 * 60));
        const remainingTimeInMinutes = remainingTimeInHours % (1000 * 60 * 60);
        const totalMinutes = Math.floor(remainingTimeInMinutes / (1000 * 60));

        const msg = (`Lead time for task ${id}: ${totalDays} days, ${totalHours} hours and ${totalMinutes} minutes.`);

        return msg;
    }
}

async function getLeadTime(repo, owner, start, end) {
    const data = await githubRequest(requests.GET_LEAD_TIME, repo, owner);
    console.log(data);
   
    const issues = data.data.repository.issues.nodes;
    
    const startParam = new Date(start); // Specify your start parameter
    const endParam = new Date(end); // Specify your end parameter

    const result = issues
    .filter(issue => {
        const createdAt = new Date(issue.createdAt);
        return createdAt >= startParam && createdAt <= endParam;
    })
    .map(issue => {
        const createdAt = new Date(issue.createdAt);
        const closedAt = new Date(issue.closedAt);
        const timeDiff = closedAt - createdAt;

        const minutes = Math.floor(timeDiff / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return `Issue ${issue.number}: ${days} days, ${hours % 24} hours, ${minutes % 60} minutes`;
    })
    .join('<br>');
    return result;
}

async function getActiveTasksCount(repo, owner, columnName) {
    const data = await githubRequest(requests.GET_ACTIVE_TASKS_COUNT, repo, owner);
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
      
    return `Status Counts for column '${columnName}':`, columnCounts;
}

async function getCompletedTasksCount(repo, owner, start, end) {
    const data = await githubRequest(
        requests.GET_COMPLETED_TASKS_COUNT, repo, owner);

    const issues = data.data.repository.issues.nodes;
    const startParam = new Date(start); // Specify your start parameter
    const endParam = new Date(end); // Specify your end parameter
        
    const filteredIssues = issues.filter(issue => {
        const createdAt = new Date(issue.createdAt);
        return createdAt >= startParam && createdAt <= endParam;
        });
        
    const issueCount = filteredIssues.length;
    return `There were ${issueCount} issue(s) completed within ${start} and ${end}`;
}

// ----------------
// PULL REQUEST METRICS
// ----------------

async function getPRMetric1() {
    // TODO: rename function/request string and implement
    const data = await githubRequest(requests.GET_PR_METRIC1);
    return {};
}

async function getPRMetric2() {
    // TODO: rename function/request string and implement
    const data = await githubRequest(requests.GET_PR_METRIC2);
    return {};
}

async function getPRMetric3() {
    // TODO: rename function/request string and implement
    const data = await githubRequest(requests.GET_PR_METRIC3);
    return {};
}

async function getPRMetric4() {
    // TODO: rename function/request string and implement
    const data = await githubRequest(requests.GET_PR_METRIC4);
    return {};
}

async function getPRMetric5() {
    // TODO: rename function/request string and implement
    const data = await githubRequest(requests.GET_PR_METRIC5);
    return {};
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
    getPRMetric1,
    getPRMetric2,
    getPRMetric3,
    getPRMetric4,
    getPRMetric5,
    getSnapshot,
};
