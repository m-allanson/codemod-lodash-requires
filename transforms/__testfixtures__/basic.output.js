const get = require("lodash/get");

module.exports = function (foo) {
  get(foo, "bar", "baz")
};
