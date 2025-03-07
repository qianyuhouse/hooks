import jsx from "@vue/babel-plugin-jsx";

import * as babel from "@babel/core";

import { babelParse } from "vue/compiler-sfc";
import traverse from "@babel/traverse";
import generator from "@babel/generator";

import { createFilter } from "vite";

const filter = createFilter(/\.[jt]sx$/);

export function transform(code, path, idx) {
  const [filepath] = path.split("?");
  if (filter(path) || filter(filepath)) {
    let result = babel.transformSync(code, { plugins: [jsx] });
    const ast = babelParse(result.code, { sourceType: "module" });
    const replaceScopeVarsName = (path) => {
      for (let i in path.scope.bindings) {
        let item = path.scope.bindings[i];
        let newName = item.identifier.name + idx;
        item.identifier.name = newName;
        item.referencePaths.forEach((refItem) => {
          refItem.node.name = newName;
        });
      }
    };

    traverse.default(ast, {
      ImportDeclaration: replaceScopeVarsName,
      VariableDeclaration: replaceScopeVarsName,
      FunctionDeclaration: replaceScopeVarsName
    });
    result = generator.default(ast);

    if (!result.code) return;
    return {
      code: result.code,
      map: result.map
    };
  }
}
