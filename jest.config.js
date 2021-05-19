module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  watchman: true,

  //   setupFiles: ["../api/test/jestEnvVars"],
};

process.env = Object.assign(process.env, {
  JWT_key: "test key",
});
// For a detailed explanation visit:
// https://jestjs.io/docs/en/configuration.html
