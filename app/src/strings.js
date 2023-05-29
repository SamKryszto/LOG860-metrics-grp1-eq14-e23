// TODO: change requests qraphql strings

const DEFAULT_OWNER = "SamKryszto";

const DEFAULT_REPO = "Oxgen-OS---Eq-14--E23";

const BASE_QUERY = `
{
    repository(name: "%s", owner: "%s") {
        %s
    }
}`;

const requests = {
    GET_TASK_LEAD_TIME: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_LEAD_TIME: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_LEAD_TIME: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_ACTIVE_TASKS_COUNT: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_COMPLETED_TASKS_COUNT: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_PR_METRIC1: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_PR_METRIC2: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_PR_METRIC3: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_PR_METRIC4: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_PR_METRIC5: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
    GET_SNAPSHOT: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
};

module.exports = { requests, DEFAULT_OWNER, DEFAULT_REPO, BASE_QUERY };
