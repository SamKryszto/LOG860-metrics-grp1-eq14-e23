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
router.get("/pr_count", controller.getPRCount);
router.get("/pr_state/:id", controller.getPRState);
router.get("/pr_merge_time/:id", controller.getPRMergeTime);
router.get("/pr_comments_count/:id", controller.getPRCommentsCount);
router.get("/pr_reviewers/:id", controller.getPRReviewers);

// ----------------
// VISUALIZATION METRICS
// ----------------
router.post("/snapshot", controller.saveSnapshot);
router.get("/snapshot", controller.getSnapshots);

module.exports = router;
