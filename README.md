# codemod-lodash-requires

A codemod to modify lodash requires from "full import" to "single method" style in CommonJS modules.

Fixes eslint errors for [eslint-plugin-lodash/import-scope](https://github.com/wix/eslint-plugin-lodash/blob/master/docs/rules/import-scope.md) using config `[2, "method"]`.

Requires [`jscodeshift`](https://github.com/facebook/jscodeshift).

# Getting started

- Install jscodeshift: `npm i -g jscodeshift`
- Check output with a dry run, where `<PATH>` is the path to files you want to transform: `jscodeshift --dry-run --print -t ./transforms/full-import-to-single-method-require.js <PATH>`
- Run the transformation. Note this will modify files at `<PATH>`. Ensure you have backups. `jscodeshift -t ./transforms/full-import-to-single-method-require.js <PATH>`
