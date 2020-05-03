const { defineTest } = require("jscodeshift/dist/testUtils");

// List of all test fixtures with an input and output pair for each.
const TEST_FIXTURES = ["basic", "multi", "no-lodash", "not-called"];

describe("lodash-full-import-to-single-method-require", () => {
  TEST_FIXTURES.forEach((testName) =>
    defineTest(
      `${__dirname}/transforms`,
      "full-import-to-single-method-require",
      null,
      testName
    )
  );
});
