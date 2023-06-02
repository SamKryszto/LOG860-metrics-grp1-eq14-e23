const router = require("express").Router();
const controller = require("../controllers/metric");

// ----------------
// KANBAN METRICS
// ----------------
/**
 * @swagger
 * /metric/lead_time:
 *     get:
 *         summary: Retrieve lead time of each issues.
 *         description: Retrieve lead time of each issues.
 *         parameters:
 *             - in: query
 *               name: start
 *               required: true
 *               description: Start date
 *               schema:
 *                   type: string
 *             - in: query
 *               name: end
 *               required: true
 *               description: End date
 *               schema:
 *                   type: string
 *         reponses:
 *             200:
 *                 description: Lead time of each issues.
 *                 content:
 *                     text/html; charset=utf-8:
 *                         schema:
 *                             type: string
 * 
 */
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
