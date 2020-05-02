import { defineTest } from "jscodeshift/dist/testUtils";

// List of all test fixtures with an input and output pair for each.
const TEST_FIXTURES = ["multi", "basic"] as const;

type TestFixtures = typeof TEST_FIXTURES[number];

describe("implicit-icons-to-explicit-imports", () => {
  TEST_FIXTURES.forEach((testName) =>
    defineTest(
      `${__dirname}/transforms`,
      "root-require-to-method-require",
      null,
      testName
    )
  );
});
