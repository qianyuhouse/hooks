const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
exports.default = {
  input: "./src/index.ts",
  output: [
    {
      name: "hooks",
      globals: {
        vue: "vue"
      },
      file: "dist/hooks.js",
      format: "umd"
    }
  ],
  plugins: [
    resolve(),
    commonjs({ include: /node_modules/ }),
    typescript({
      exclude: ["**/demo/*.tsx"]
      // declaration: true,
      // declarationDir: "dist/types"
    }),
    terser()
  ],
  external: ["vue"]
};
