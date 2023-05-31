const models = require("../models/models"); // Import your Sequelize models
const githubService = require("../services/github");

async function getTaskLeadTime(req, res) {
    const { owner, repo } = req.query;
    const id = req.params.id;
    const result = await githubService.getTaskLeadTime(repo, owner, id);
    res.send(result);
}

async function getLeadTime(req, res) {
    const { owner, repo } = req.query;
    const start = req.query.start;
    const end = req.query.end;

    const result = await githubService.getLeadTime(repo, owner, start, end);
    res.send(result);
}

async function getActiveTasksCount(req, res) {
    const { owner, repo } = req.query;

    const column = req.query.column;
    const result = await githubService.getActiveTasksCount(repo, owner, column);
    res.send(result);
}

async function getCompletedTasksCount(req, res) {
    const { owner, repo } = req.query;

    const start = req.query.start;
    const end = req.query.end;
    
    const result = await githubService.getCompletedTasksCount(repo, owner, start, end);
    res.send(result);
}

// ----------------
// PULL REQUEST METRICS
// ----------------

async function getPRCount(req, res) {
    const { owner, repo } = req.query;
    const result = await githubService.getPRCount(owner, repo);
    res.send(result);
}

async function getPRState(req, res) {
    const { id } = req.params;
    const { owner, repo } = req.query;
    const result = await githubService.getPRState(owner, repo, id);
    res.send(result);
}

async function getPRMergeTime(req, res) {
    const { id } = req.params;
    const { owner, repo } = req.query;
    const result = await githubService.getPRMergeTime(owner, repo, id);
    res.send(result);
}

async function getPRCommentsCount(req, res) {
    const { id } = req.params;
    const { owner, repo } = req.query;
    const result = await githubService.getPRCommentsCount(owner, repo, id);
    res.send(result);
}

async function getPRReviewers(req, res) {
    const { id } = req.params;
    const { owner, repo } = req.query;
    const result = await githubService.getPRReviewers(owner, repo, id);
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
    getPRCount,
    getPRState,
    getPRMergeTime,
    getPRCommentsCount,
    getPRReviewers,
    saveSnapshot,
    getSnapshots,
};
