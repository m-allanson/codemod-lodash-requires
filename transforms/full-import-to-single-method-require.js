// Modify lodash requires from "full import" to "single method" style in CommonJS modules.
// Fixes eslint errors for eslint-plugin-lodash/import-scope using config [2, "method"].
//
// See https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/import-scope.md
const transform = (file, api) => {
  const j = api.jscodeshift;
  const ast = j(file.source);

  // Cache of underscore methods used
  j.__methods = {};

  const lodashRequireDeclarations = ast.find(
    j.VariableDeclaration,
    LODASH_REQUIRE_DECLARATION
  );

  // skip if there's no lodash require
  if (lodashRequireDeclarations.length === 0) return file.source;

  // Replace: _.<method>()
  // with:      <method>()
  ast
    .find(j.MemberExpression, UNDERSCORE_EXPRESSION)
    .replaceWith(function (path) {
      const methodName = path.node.property.name;
      j.__methods[methodName] = true;
      return j.identifier(methodName);
    });

  // replace: const _ = require('lodash')
  // with:    const <methodName> = require('lodash/<methodName>')
  // for each <methodName> in j.__methods
  lodashRequireDeclarations.replaceWith(function () {
    const methods = Object.keys(j.__methods).sort(); // alphabetical ordering
    return methods.map((methodName) => createLodashRequire(j, methodName));
  });

  return ast.toSource();
};

function createLodashRequire(j, methodName) {
  return j.variableDeclaration("const", [
    j.variableDeclarator(
      j.identifier(methodName),
      j.callExpression(j.identifier("require"), [
        j.literal(`lodash/${methodName}`),
      ])
    ),
  ]);
}

// describe _.<methodName>()
const UNDERSCORE_EXPRESSION = {
  type: "MemberExpression",
  object: {
    name: "_",
  },
};

// describe <const/let/var> _ = require("lodash")
const LODASH_REQUIRE_DECLARATION = {
  declarations: [
    {
      type: "VariableDeclarator",
      id: {
        name: "_",
      },
      init: {
        callee: {
          name: "require",
        },
        arguments: [{ value: "lodash" }],
      },
    },
  ],
};

module.exports = transform;
