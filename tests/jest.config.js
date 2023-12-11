const config = {
    testEnvironment: "node",
    testPathIgnorePatterns: [
      "/node_modules/",
      "/build/"
    ],
    setupFilesAfterEnv: ["./tests/jest.setup.js"],
    //verbose: true
};

module.exports = config;