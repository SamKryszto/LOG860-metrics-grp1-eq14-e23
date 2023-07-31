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
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository where to retrieve issues
 *               schema:
 *                   type: string
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
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/lead_time", controller.getLeadTime);

/**
 * @swagger
 * /metric/lead_time/{id}:
 *     get:
 *         summary: Retrieve lead time of an issue.
 *         description: Retrieve lead time of an issue.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: path
 *               name: id
 *               required: true
 *               description: Id of issue
 *               schema:
 *                   type: number
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/lead_time/:id", controller.getTaskLeadTime);

/**
 * @swagger
 * /metric/active_tasks_count:
 *     get:
 *         summary: Retrieve issues that are opened.
 *         description: Retrieve issues that are opened.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: query
 *               name: column
 *               required: true
 *               description: Column of kanban board
 *               schema:
 *                   type: string
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/active_tasks_count", controller.getActiveTasksCount);

/**
 * @swagger
 * /metric/completed_tasks_count:
 *     get:
 *         summary: Retrieve issues that are completed.
 *         description: Retrieve issues that are completed.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
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
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/completed_tasks_count", controller.getCompletedTasksCount);

// ----------------
// PULL REQUEST METRICS
// ----------------

/**
 * @swagger
 * /metric/pr_count:
 *     get:
 *         summary: Retrieve pull requests count.
 *         description: Retrieve pull requests count.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/pr_count", controller.getPRCount);

/**
 * @swagger
 * /metric/pr_state/{id}:
 *     get:
 *         summary: Retrieve state of a pull request.
 *         description: Retrieve state of a pull request.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: path
 *               name: id
 *               required: true
 *               description: Id of pull request
 *               schema:
 *                   type: number
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/pr_state/:id", controller.getPRState);

/**
 * @swagger
 * /metric/pr_merge_time/{id}:
 *     get:
 *         summary: Retrieve merge time of a pull request.
 *         description: Retrieve merge time of a pull request.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: path
 *               name: id
 *               required: true
 *               description: Id of pull request
 *               schema:
 *                   type: number
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/pr_merge_time/:id", controller.getPRMergeTime);

/**
 * @swagger
 * /metric/pr_comments_count/{id}:
 *     get:
 *         summary: Retrieve comments count of a pull request.
 *         description: Retrieve comments count of a pull request.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: path
 *               name: id
 *               required: true
 *               description: Id of pull request
 *               schema:
 *                   type: number
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/pr_comments_count/:id", controller.getPRCommentsCount);

/**
 * @swagger
 * /metric/pr_reviewers/{id}:
 *     get:
 *         summary: Retrieve reviewers of a pull request.
 *         description: Retrieve reviewers of a pull request.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository to retrieve issues
 *               schema:
 *                   type: string
 *             - in: path
 *               name: id
 *               required: true
 *               description: Id of pull request
 *               schema:
 *                   type: number
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: string
 *
 */
router.get("/pr_reviewers/:id", controller.getPRReviewers);

// ----------------
// VISUALIZATION METRICS
// ----------------

/**
 * @swagger
 * /metric/snapshot:
 *     put:
 *         summary: Take a snapshot of Kanban Board.
 *         description: Take a snapshot of Kanban Board.
 *         parameters:
 *             - in: query
 *               name: owner
 *               required: false
 *               description: Owner of repository
 *               schema:
 *                   type: string
 *             - in: query
 *               name: repo
 *               required: false
 *               description: Repository where to retrieve issues
 *               schema:
 *                   type: string
 *         responses:
 *          200:
 *           description: Lead time of each issue.
 *           content:
 *           text/html:
 *             schema:
 *               type: integer
 *
 */
router.put("/snapshot", controller.getSnapshot);

module.exports = router;
