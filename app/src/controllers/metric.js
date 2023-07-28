const db = require("../models");
const models = require("../models"); // Import your Sequelize models
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

    const result = await githubService.getCompletedTasksCount(
        repo,
        owner,
        start,
        end
    );
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

async function takeSnapshot(req, res) {
    // TODO: take snapshot of kanban board
    const { owner, repo } = req.params;
    const kanbanBoard = githubService.getKanbanBoard(owner, repo);
    const result = [];
    // get kanban board
    console.log("inserting to issues");
    // TODO:
    // create columns
    // create kanbansnapshot
    // const snapshot = await db.kanbanSnapshots.create({});
    // const { snapshotId } = snapshot.dataValues;
    // console.log("new id: " + snapshotId);
    // try {
    //     await db.issues.create({
    //         title: "test",
    //     });
    // } catch (e) {
    //     console.log(e);
    // }
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
    takeSnapshot,
};
