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
