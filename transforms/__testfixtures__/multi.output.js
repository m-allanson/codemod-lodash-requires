const get = require("lodash/get");
const isRegExp = require("lodash/isRegExp");
const isString = require("lodash/isString");

module.exports = function (foo, bar) {
  const severity = get(
    foo.stylelint,
    ["ruleSeverities", bar],
    "ignore"
  );
  const otherThing = [isString, isRegExp];

  return { severity, otherThing };
};
