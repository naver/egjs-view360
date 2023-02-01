/* eslint-env node */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "../../../.eslintrc.js"
  ],
  overrides: [{
    files: [
      "./**/*.{ts,tsx}"
    ],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off"
    }
  }]
};
