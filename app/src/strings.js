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
    GET_PR_COUNT: `
        pullRequests(first: 100) {
            totalCount
        }
    `,
    GET_PR_STATE: `
        pullRequest(number: %s) {
            state
        }
    `,
    GET_PR_MERGE_TIME: `
        pullRequest(number: %s) {
            mergedAt
            createdAt
        }
    `,
    GET_PR_COMMENTS_COUNT: `
        pullRequest(number: %s) {
            comments {
                totalCount
            }
            title
        }
    `,
    GET_PR_REVIEWERS: `
        pullRequest(number: %s) {
            reviewRequests(first: 10) {
                nodes {
                    requestedReviewer {
                        ... on User {
                            login
                        }
                    }
                }
            }
        }
    `,
    GET_SNAPSHOT: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
};

module.exports = { requests, DEFAULT_OWNER, DEFAULT_REPO, BASE_QUERY };
