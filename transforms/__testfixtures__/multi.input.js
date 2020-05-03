const _ = require("lodash");

module.exports = function (foo, bar) {
  const severity = _.get(blah, "blah");
  const otherThing = [_.isString("a"), _.isRegExp("b")];

  return { severity, otherThing };
};
