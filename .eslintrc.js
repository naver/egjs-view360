/* eslint-env node */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "compat",
    "es"
  ],
  extends: [
    "eslint:recommended",
    "plugin:compat/recommended",
    "plugin:es/restrict-to-es2015"
  ],
  settings: {
    polyfills: [
      "Promise",
      "XRWebGLLayer"
    ]
  },
  overrides: [{
    files: [
      "./**/*.{ts,tsx}"
    ],
    extends: [
      "plugin:@typescript-eslint/recommended"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/member-ordering": ["error", {
        "default": [
          // Index signature
          "signature",

          "public-static-method",
          "protected-static-method",
          "private-static-method",

          "constructor",

          "public-abstract-method",
          "protected-abstract-method",
          "private-abstract-method",

          "public-instance-method",
          "protected-instance-method",
          "private-instance-method"
        ]
      }]
    }
  }],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "es/no-optional-chaining": "off",
    "es/no-rest-spread-properties": "off",
    "es/no-async-functions": "off",
    "es/no-nullish-coalescing-operators": "off",
    "es/no-object-values": "off",
    "no-empty-pattern": "off"
  }
};
