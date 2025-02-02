const js = require("@eslint/js");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        require: "readonly",
        process: "readonly",
        module: "readonly",
        __dirname: "readonly",
        console: "readonly",
      },
    },
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-underscore-dangle": "off",
      "no-console": "off",
      "linebreak-style": "off",
    },
  },
];

