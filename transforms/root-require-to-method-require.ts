import { Transform, Core, JSCodeshift, ImportSpecifier } from "jscodeshift";

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasModifications = false;

  return root.toSource();

  return hasModifications ? root.toSource() : null;
};

export default transform;
