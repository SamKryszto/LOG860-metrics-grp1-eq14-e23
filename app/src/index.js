const express = require("express");
const models = require("./models"); // Import your Sequelize models
const {
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
} = require("./requests");
const app = express();
const port = process.env.PORT;
const metricRouter = express.Router();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ----------------
// KANBAN METRICS
// ----------------

metricRouter.get("/lead_time", async (req, res) => {
    const result = await getLeadTime();
    res.send(result);
});

metricRouter.get("/lead_time/:id", async (req, res) => {
    const id = req.params.id;
    const result = await getTaskLeadTime(id);
    res.send(result);
});

metricRouter.get("/active/count", async (req, res) => {
    const { column } = req.query;
    const result = await getActiveTasksCount(column);
    res.send(result);
});

metricRouter.get("/completed/count", async (req, res) => {
    const { column } = req.query;
    const result = await getCompletedTasksCount(column);
    res.send(result);
});

// ----------------
// PULL REQUEST METRICS
// ----------------

metricRouter.get("/pr/m1", async (req, res) => {
    const result = await getPRMetric1();
    res.send(result);
});

metricRouter.get("/pr/m2", async (req, res) => {
    const result = await getPRMetric2();
    res.send(result);
});

metricRouter.get("/pr/m3", async (req, res) => {
    const result = await getPRMetric3();
    res.send(result);
});

metricRouter.get("/pr/m4", async (req, res) => {
    const result = await getPRMetric4();
    res.send(result);
});

metricRouter.get("/pr/m5", async (req, res) => {
    const result = await getPRMetric5();
    res.send(result);
});

// ----------------
// VISUALIZATION METRICS
// ----------------

metricRouter.post("/snapshot", async (req, res) => {
    const result = await getSnapshot();
    // TODO: save result in database
    res.send(result);
});

metricRouter.get("/snapshot", async (req, res) => {
    const { startDate, endDate, period } = req.params;
    const result = [];
    // TODO: fetch from database
    res.send(result);
});

app.use("/metric", metricRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
