const axios = require("axios");
const githubService = require("../../src/services/github");

jest.mock("axios");

const createRes = (repository) => {
    return {
        data: {
            data: {
                repository,
            },
        },
    };
};

// ---------------
// async function getTaskLeadTime(repo, owner, id)
// ---------------
describe("getTaskLeadTime", () => {
    const id = "1";

    describe("when graphql call returns an issue with createdAt and closedAt property", () => {
        it("should return correct calculated lead time", async () => {
            const res = createRes({
                issue: {
                    createdAt: "2023-05-26T15:53:06Z",
                    closedAt: "2023-05-26T16:00:37Z",
                },
            });
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getTaskLeadTime(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe(
                "Lead time for task 1: 0 days, 0 hours and 7 minutes."
            );
        });
    });

    describe("when graphql call returns an issue with no closedAt property", () => {
        it("should return an error message", async () => {
            const res = {
                data: {
                    data: {
                        repository: {
                            issue: {
                                createdAt: "2023-05-26T15:53:06Z",
                                closedAt: null,
                            },
                        },
                    },
                },
            };
            axios.post.mockResolvedValueOnce(res);
            const result = await githubService.getTaskLeadTime(
                expect.any(String),
                expect.any(String),
                id
            );
            expect(result).toBe("The task has not been closed yet.");
        });
    });
});

// ---------------
// async function getLeadTime(repo, owner, start, end)
// ---------------
describe("getLeadTime", () => {
    const res = {
        data: {
            data: {
                repository: {
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
                },
            },
        },
    };

    beforeEach(() => {
        axios.post.mockResolvedValueOnce(res);
    });

    describe("when graphql call returns list of issues that aren't in range specified", () => {
        it("should return a list of issues with their lead time", async () => {
            const result = await githubService.getLeadTime(
                expect.any(String),
                expect.any(String),
                "2022-05-10",
                "2023-05-31"
            );
            expect(result).toBe(
                "Issue 1: 0 days, 0 hours, 7 minutes<br>Issue 7: 0 days, 0 hours, 6 minutes<br>Issue 8: 0 days, 11 hours, 48 minutes"
            );
        });
    });

    describe("when graphql call returns list of issues that are in range specified", () => {
        it("should return nothing", async () => {
            const result = await githubService.getLeadTime(
                expect.any(String),
                expect.any(String),
                "2021-05-10",
                "2022-05-31"
            );
            expect(result).toBe("");
        });
    });
});

// ---------------
// async function getActiveTasksCount(repo, owner, columnName)
// ---------------
describe("getActiveTasksCount", () => {
    let columnName = "TODO";
    const res = {
        data: {
            data: {
                repository: {
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
                                            ],
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        },
    };

    beforeEach(() => {
        axios.post.mockResolvedValueOnce(res);
    });

    describe("when graphql call returns list of issues for column specified", () => {
        it("should return their count", async () => {
            const result = await githubService.getActiveTasksCount(
                expect.any(String),
                expect.any(String),
                columnName
            );
            expect(result).toBe(`Active tasks in column '${columnName}': 1`);
        });
    });

    describe("when graphql call returns no issues for column specified", () => {
        it("should return their count which is equal to 0", async () => {
            columnName = "In progress";
            const result = await githubService.getActiveTasksCount(
                expect.any(String),
                expect.any(String),
                columnName
            );
            expect(result).toBe(`Active tasks in column '${columnName}': 0`);
        });
    });
});

// ---------------
// async function getCompletedTasksCount(repo, owner, start, end)
// ---------------
describe("getCompletedTasksCount", () => {
    let start = "2023-05-10";
    let end = "2023-05-31";
    const res = {
        data: {
            data: {
                repository: {
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
                },
            },
        },
    };

    beforeEach(() => {
        axios.post.mockResolvedValueOnce(res);
    });

    describe("when graphql call returns list of closed issues that in range specified", () => {
        it("should return their count", async () => {
            const result = await githubService.getCompletedTasksCount(
                expect.any(String),
                expect.any(String),
                start,
                end
            );
            expect(result).toBe(
                `There were 3 issue(s) completed within ${start} and ${end}`
            );
        });
    });

    describe("when graphql call returns list of closed issues that aren't in range specified", () => {
        it("should return their count equal to 0", async () => {
            let start = "2021-05-10";
            let end = "2022-05-31";
            const result = await githubService.getCompletedTasksCount(
                expect.any(String),
                expect.any(String),
                start,
                end
            );
            expect(result).toBe(
                `There were 0 issue(s) completed within ${start} and ${end}`
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
            createRes({
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
            createRes({
                pullRequest: { state: "MERGED" },
            }),
            "should return its state",
            `State of pull request ${id}: MERGED.`,
        ],
        [
            "when graphql call returns no pull request",
            createRes({
                pullRequest: null,
            }),
            "should return an error message",
            `Pull request ${id} doesn't exists.`,
        ],
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
            createRes({
                pullRequest: {
                    mergedAt: "2023-05-30T20:17:55Z",
                    createdAt: "2023-05-30T19:54:09Z",
                },
            }),
            "should return its merge time",
            `Merge time for pull request ${id}: 0 days, 0 hours, 23 minutes.`,
        ],
        [
            "when graphql call returns no pull request",
            createRes({
                pullRequest: null,
            }),
            "should return an error message",
            `Pull request ${id} doesn't exists.`,
        ],
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
            createRes({
                pullRequest: {
                    comments: {
                        totalCount: 1,
                    },
                },
            }),
            "should return it's comments count",
            `Number of comments for pull request ${id}: 1.`,
        ],
        [
            "when graphql call returns no pull request",
            createRes({ pullRequest: null }),
            "should return an error message",
            `Pull request ${id} doesn't exists.`,
        ],
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
            createRes({
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
            "should return it's reviewers",
            `Reviewers for pull request ${id}: msialercruz.`,
        ],
        [
            "when graphql call returns no pull request",
            createRes({ pullRequest: null }),
            "should return an error message",
            `Pull request ${id} doesn't exists.`,
        ],
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
