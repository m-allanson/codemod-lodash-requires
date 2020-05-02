const _ = require("lodash");

module.exports = function (foo, bar) {
  const severity = _.get(
    foo.stylelint,
    ["ruleSeverities", bar],
    "ignore"
  );
  const otherThing = [_.isString, _.isRegExp];

  return { severity, otherThing };
};
