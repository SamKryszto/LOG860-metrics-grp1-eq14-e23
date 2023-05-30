// TODO: change requests qraphql strings
const BASE_QUERY = `
{
    repository(name: "%s", owner: "%s") {
        %s
    }
}`;

const requests = {
    GET_TASK_LEAD_TIME: `
    query MyQuery {
        repository(name: "%s", owner: "%s") {
          issue(number: %s) {
            createdAt
            closedAt
          }
        }
    }
    `,
    GET_LEAD_TIME: `
    query MyQuery {
        repository(name: "%s",owner: "%s") {
          issues(first: 100, filterBy: {states: CLOSED}) {
            nodes {
              number
              createdAt
              closedAt
            }
          }
        }
      }
    `,
   
    GET_ACTIVE_TASKS_COUNT: `
    {
        repository(name: "%s", owner: "%s") {
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
        }
      }
    `,
    GET_COMPLETED_TASKS_COUNT: `
    query MyQuery {
        repository(name: "%s",owner: "%s") {
          issues(first: 100, filterBy: {states: CLOSED}) {
            nodes {
              number
              createdAt
              closedAt
            }
          }
        }
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

module.exports = { requests};
