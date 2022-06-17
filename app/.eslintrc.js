// @ts-check

"use strict";

const { resolve } = require("path");

module.exports = {
  extends: ["eslint:recommended", "plugin:react-hooks/recommended"],
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    babelOptions: {
      configFile: resolve(__dirname, ".babelrc"),
    },
  },
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["*.mjs"],
      parserOptions: {
        sourceType: "module",
      },
      globals: {
        __dirname: "off",
        __filename: "off",
        exports: "off",
        module: "off",
        require: "off",
      },
    },
  ],
};
