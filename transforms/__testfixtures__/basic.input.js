const _ = require("lodash");

module.exports = function (foo) {
  _.get(foo, "bar", "baz")
};
