// TODO: change requests qraphql strings

const DEFAULT_OWNER = "SamKryszto";

//const DEFAULT_REPO_METRICS = "Metrics-grp01-eq14";
const DEFAULT_REPO = "oxygen-cs-grp01-eq14";

const BASE_QUERY = `
{
    repository(name: "%s", owner: "%s") {
        %s
    }
}`;

const requests = {
    GET_TASK_LEAD_TIME: `
        issue(number: %s) {
            createdAt
            closedAt
        }
    `,
    GET_LEAD_TIME: `
        issues(first: 100, filterBy: {states: CLOSED}) {
            nodes {
                number
                createdAt
                closedAt
            }
        }
    `,

    GET_ACTIVE_TASKS_COUNT: `
        projectsV2(first: 1) {
            nodes {
                view(number: 1) {
                    project {
                        items(first: 100) {
                            nodes {
                                fieldValues(first: 100) {
                                    edges {
                                        node {
                                            ... on ProjectV2ItemFieldSingleSelectValue {
                                                name
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `,
    GET_COMPLETED_TASKS_COUNT: `
        issues(first: 100, filterBy: {states: CLOSED}) {
            nodes {
                number
                createdAt
                closedAt
            }
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

    GET_BUILD_TIME: `
        projectsV2(first: 10) {
            totalCount
        }
    `,

    GET_MEAN_BUILD_TIME: `
        projectsV2(first: 10) {
            totalCount
        }
    `,

    GET_BUILD_SUCCESS: `
        projectsV2(first: 10) {
            totalCount
        }
    `,

    GET_TEST_SUCCESS: `
        projectsV2(first: 10) {
            totalCount
        }
    `,
};

module.exports = { requests, DEFAULT_OWNER, DEFAULT_REPO, BASE_QUERY };
