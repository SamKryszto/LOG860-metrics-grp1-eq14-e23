const axios = require("axios");
const githubService = require("../../src/services/github");

jest.mock("axios");

const createResFrom = (repository) => ({ data: { data: { repository } } });

// ---------------
// async function getTaskLeadTime(repo, owner, id)
// ---------------
describe("getTaskLeadTime", () => {
    let id = 1;
    describe.each([
        [
            "when graphql call returns an issue with createdAt and closedAt property",
            createResFrom({
                issue: {
                    createdAt: "2023-05-26T15:53:06Z",
                    closedAt: "2023-05-26T16:00:37Z",
                },
            }),
            "should return correct calculated lead time",
            `Lead time for task ${id}: 0 days, 0 hours and 7 minutes.`,
        ],
        [
            "when graphql call returns an issue with no closedAt property",
            createResFrom({
                issue: {
                    createdAt: "2023-05-26T15:53:06Z",
                    closedAt: null,
                },
            }),
            "should return an error message",
            "The task has not been closed yet.",
        ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getTaskLeadTime(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(expected);
        });
    });
});

// ---------------
// async function getLeadTime(repo, owner, start, end)
// ---------------
describe("getLeadTime", () => {
    const res = createResFrom({
        issues: {
            nodes: [
                {
                    number: 1,
                    createdAt: "2023-05-26T15:53:06Z",
                    closedAt: "2023-05-26T16:00:37Z",
                },
                {
                    number: 7,
                    createdAt: "2023-05-29T21:49:45Z",
                    closedAt: "2023-05-29T21:55:54Z",
                },
                {
                    number: 8,
                    createdAt: "2023-05-30T00:02:01Z",
                    closedAt: "2023-05-30T11:50:09Z",
                },
            ],
        },
    });
    describe.each([
        [
            "when graphql call returns list of issues that aren't in range specified",
            res,
            "should return a list of issues with their lead time",
            "2022-05-10",
            "2023-05-31",
            "Issue 1: 0 days, 0 hours, 7 minutes<br>Issue 7: 0 days, 0 hours, 6 minutes<br>Issue 8: 0 days, 11 hours, 48 minutes",
        ],
        [
            "when graphql call returns list of issues that are in range specified",
            res,
            "should return nothing",
            "2021-05-10",
            "2022-05-31",
            "",
        ],
    ])("%s", (name, res, testName, start, end, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getLeadTime(
                expect.any(String),
                expect.any(String),
                start,
                end
            );
            expect(result).toBe(expected);
        });
    });
});

// ---------------
// async function getActiveTasksCount(repo, owner, columnName)
// ---------------
describe("getActiveTasksCount", () => {
    const res = createResFrom({
        projectsV2: {
            nodes: [
                {
                    view: {
                        project: {
                            items: {
                                nodes: [
                                    {
                                        fieldValues: {
                                            edges: [
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {
                                                        name: "TODO",
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                    {
                                        fieldValues: {
                                            edges: [
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {},
                                                },
                                                {
                                                    node: {
                                                        name: "TODO",
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            ],
        },
    });
    describe.each([
        [
            "when graphql call returns list of issues for column specified",
            res,
            "should return their count",
            "TODO",
            "Status Counts for column 'TODO': 2",
        ],
        [
            "when graphql call returns no issues for column specified",
            res,
            "should return their count equal to 0",
            "In Progress",
            "Status Counts for column 'In Progress': 0",
        ],
    ])("%s", (name, res, testName, columnName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getActiveTasksCount(
                expect.any(String),
                expect.any(String),
                columnName
            );
            expect(result).toStrictEqual(expected);
            // expect(result).toBe(
            //     `Active tasks in column '${columnName}': ${count}`
            // );
        });
    });
});

// ---------------
// async function getCompletedTasksCount(repo, owner, start, end)
// ---------------
describe("getCompletedTasksCount", () => {
    const res = createResFrom({
        issues: {
            nodes: [
                {
                    number: 1,
                    createdAt: "2023-05-26T15:53:06Z",
                    closedAt: "2023-05-26T16:00:37Z",
                },
                {
                    number: 7,
                    createdAt: "2023-05-29T21:49:45Z",
                    closedAt: "2023-05-29T21:55:54Z",
                },
                {
                    number: 8,
                    createdAt: "2023-05-30T00:02:01Z",
                    closedAt: "2023-05-30T11:50:09Z",
                },
            ],
        },
    });
    describe.each([
        [
            "when graphql call returns list of closed issues that in range specified",
            res,
            "should return their count",
            "2022-05-10",
            "2023-05-31",
            3,
        ],
        [
            "when graphql call returns list of closed issues that aren't in range specified",
            res,
            "should return their count equal to 0",
            "2021-05-10",
            "2022-05-31",
            0,
        ],
    ])("%s", (name, res, testName, start, end, count) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getCompletedTasksCount(
                expect.any(String),
                expect.any(String),
                start,
                end
            );
            expect(result).toBe(
                `There were ${count} issue(s) completed within ${start} and ${end}`
            );
        });
    });
});

// ---------------
// async function getPRCount(owner, repo)
// ---------------
describe("getPRCount", () => {
    describe.each([
        [
            "when graphql call returns a list of pull requests",
            createResFrom({
                pullRequests: {
                    totalCount: 3,
                },
            }),
            "should return their count",
            "Number of pull requests: 3.",
        ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getPRCount(
                expect.any(String),
                expect.any(String)
            );
            expect(result).toBe(`Number of pull requests: 3.`);
        });
    });
});

// ---------------
// async function getPRState(owner, repo, id)
// ---------------
describe("getPRState", () => {
    let id = 11;
    describe.each([
        [
            "when graphql call returns a pull request",
            createResFrom({
                pullRequest: { state: "MERGED" },
            }),
            "should return its state",
            `State of pull request ${id}: MERGED.`,
        ],
        // [
        //     "when graphql call returns no pull request",
        //     createResFrom({
        //         pullRequest: null,
        //     }),
        //     "should return an error message",
        //     `Pull request ${id} doesn't exists.`,
        // ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getPRState(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(expected);
        });
    });
});

// ---------------
// async function getPRMergeTime(owner, repo, id)
// ---------------
describe("getPRMergeTime", () => {
    let id = 11;
    describe.each([
        [
            "when graphql call returns a pull request",
            createResFrom({
                pullRequest: {
                    mergedAt: "2023-05-30T20:17:55Z",
                    createdAt: "2023-05-30T19:54:09Z",
                },
            }),
            "should return its merge time",
            `Merge time for pull request ${id}: 0 days, 0 hours, 23 minutes.`,
        ],
        // [
        //     "when graphql call returns no pull request",
        //     createResFrom({
        //         pullRequest: null,
        //     }),
        //     "should return an error message",
        //     `Pull request ${id} doesn't exists.`,
        // ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getPRMergeTime(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(expected);
        });
    });
});

// ---------------
// async function getPRCommentsCount(owner, repo, id)
// ---------------
describe("getPRCommentsCount", () => {
    let id = 11;
    const pr = describe.each([
        [
            "when graphql call returns a pull request",
            createResFrom({
                pullRequest: {
                    comments: {
                        totalCount: 1,
                    },
                },
            }),
            "should return its comments count",
            `Number of comments for pull request ${id}: 1.`,
        ],
        // [
        //     "when graphql call returns no pull request",
        //     createResFrom({ pullRequest: null }),
        //     "should return an error message",
        //     `Pull request ${id} doesn't exists.`,
        // ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getPRCommentsCount(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(expected);
        });
    });
});

// ---------------
// async function getPRReviewers(owner, repo, id)
// ---------------
describe("getPRReviewers", () => {
    let id = 11;
    describe.each([
        [
            "when graphql call returns a pull request",
            createResFrom({
                pullRequest: {
                    reviewRequests: {
                        nodes: [
                            {
                                requestedReviewer: { login: "msialercruz" },
                            },
                        ],
                    },
                },
            }),
            "should return its reviewers",
            `Reviewers for pull request ${id}: msialercruz.`,
        ],
        // [
        //     "when graphql call returns no pull request",
        //     createResFrom({ pullRequest: null }),
        //     "should return an error message",
        //     `Pull request ${id} doesn't exists.`,
        // ],
    ])("%s", (name, res, testName, expected) => {
        it(testName, async () => {
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getPRReviewers(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(expected);
        });
    });
});
