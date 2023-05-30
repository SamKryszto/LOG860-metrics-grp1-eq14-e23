const DEFAULT_REPO = "Oxgen-OS---Eq-14--E23";
const DEFAULT_OWNER = "SamKryszto";

const models = require("../models/models"); // Import your Sequelize models
const githubService = require("../services/github");

async function getTaskLeadTime(req, res) {
    const repo = req.query.repo || DEFAULT_REPO;
    const owner = req.query.owner || DEFAULT_OWNER;
    const id = req.params.id;
    const result = await githubService.getTaskLeadTime(repo, owner, id);
    res.send(result);
}

async function getLeadTime(req, res) {
    const repo = req.query.repo || DEFAULT_REPO;
    const owner = req.query.owner || DEFAULT_OWNER;

    const start = req.query.start;
    const end = req.query.end;

    const result = await githubService.getLeadTime(repo, owner, start, end);
    res.send(result);
}

async function getActiveTasksCount(req, res) {
    const repo = req.query.repo || DEFAULT_REPO;
    const owner = req.query.owner || DEFAULT_OWNER;


    const column = req.query.column;
    const result = await githubService.getActiveTasksCount(repo, owner, column);
    res.send(result);
}

async function getCompletedTasksCount(req, res) {
    const repo = req.query.repo || DEFAULT_REPO;
    const owner = req.query.owner || DEFAULT_OWNER;

    const start = req.query.start;
    const end = req.query.end;
    
    const result = await githubService.getCompletedTasksCount(repo, owner, start, end);
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
