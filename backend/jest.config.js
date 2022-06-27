module.exports = {
    coverageProvider: "v8",
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
    testTimeout: 600000,
    "maxWorkers": 1,
    "verbose": true,
};
