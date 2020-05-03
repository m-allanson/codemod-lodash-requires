const transform = (file, api) => {
  const j = api.jscodeshift;
  const ast = j(file.source);

  // Cache of lodash methods used
  j.__methods = {};

  const lodashRequireDeclarations = ast.find(
    j.VariableDeclaration,
    LODASH_REQUIRE_DECLARATION
  );

  // skip if there's no lodash require
  if (lodashRequireDeclarations.length === 0) return file.source;

  // Replace: _.<method>
  // with:      <method>
  ast.find(j.MemberExpression, LODASH_EXPRESSION).replaceWith(function (path) {
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
const LODASH_EXPRESSION = {
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
