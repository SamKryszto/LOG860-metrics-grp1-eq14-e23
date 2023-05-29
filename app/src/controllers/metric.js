const models = require("../models/models"); // Import your Sequelize models
const githubService = require("../services/github");

async function getTaskLeadTime(req, res) {
    const id = req.params.id;
    const result = await githubService.getTaskLeadTime(id);
    res.send(result);
}

async function getLeadTime(req, res) {
    const result = await githubService.getLeadTime();
    res.send(result);
}

async function getActiveTasksCount(req, res) {
    const { column } = req.query;
    const result = await githubService.getActiveTasksCount(column);
    res.send(result);
}

async function getCompletedTasksCount(req, res) {
    const { column } = req.query;
    const result = await githubService.getCompletedTasksCount(column);
    res.send(result);
}

// ----------------
// PULL REQUEST METRICS
// ----------------

async function getPRMetric1(req, res) {
    const result = await githubService.getPRMetric1();
    res.send(result);
}

async function getPRMetric2(req, res) {
    const result = await githubService.getPRMetric2();
    res.send(result);
}

async function getPRMetric3(req, res) {
    const result = await githubService.getPRMetric3();
    res.send(result);
}

async function getPRMetric4(req, res) {
    const result = await githubService.getPRMetric4();
    res.send(result);
}

async function getPRMetric5(req, res) {
    const result = await githubService.getPRMetric5();
    res.send(result);
}

// ----------------
// VISUALIZATION METRICS
// ----------------

async function saveSnapshot(req, res) {
    const result = await githubService.getSnapshot();
    // TODO: save result in database
    res.send(result);
}

async function getSnapshots(req, res) {
    const { startDate, endDate, period } = req.params;
    const result = [];
    // TODO: fetch from database
    res.send(result);
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
    saveSnapshot,
    getSnapshots,
};
