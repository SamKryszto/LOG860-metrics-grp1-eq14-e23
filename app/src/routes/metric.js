const router = require("express").Router();
const controller = require("../controllers/metric");

// ----------------
// KANBAN METRICS
// ----------------
router.get("/lead_time", controller.getLeadTime);
router.get("/lead_time/:id", controller.getTaskLeadTime);
router.get("/active_tasks_count", controller.getActiveTasksCount);
router.get("/completed_tasks_count", controller.getCompletedTasksCount);

// ----------------
// PULL REQUEST METRICS
// ----------------
router.get("/pr_m1", controller.getPRMetric1);
router.get("/pr_m2", controller.getPRMetric2);
router.get("/pr_m3", controller.getPRMetric3);
router.get("/pr_m4", controller.getPRMetric4);
router.get("/pr_m5", controller.getPRMetric5);

// ----------------
// VISUALIZATION METRICS
// ----------------
router.post("/snapshot", controller.saveSnapshot);
router.get("/snapshot", controller.getSnapshots);

module.exports = router;
