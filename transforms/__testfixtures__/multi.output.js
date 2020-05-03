const get = require("lodash/get");
const isRegExp = require("lodash/isRegExp");
const isString = require("lodash/isString");

module.exports = function (foo, bar) {
  const severity = get(blah, "blah");
  const otherThing = [isString("a"), isRegExp("b")];

  return { severity, otherThing };
};
