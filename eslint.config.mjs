import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      "semi": ["warn", "always"],
      "quotes": ["warn", "double"],
      "no-undef": "error",
      "semi-spacing": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "prefer-arrow-callback": "warn",
      "no-use-before-define": ["error", { functions: false }],
      "no-shadow": "warn",
      "no-useless-return": "error",
      "eqeqeq": "warn",
      "curly": ["error", "multi-line"],
      "default-case": "error",
      "template-curly-spacing": ["error", "never"],

      // Enhance Readability
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "no-mixed-spaces-and-tabs": "warn",
      "space-before-blocks": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",

      // ES6
      "arrow-spacing": "error",
      "no-confusing-arrow": "error",
      "no-duplicate-imports": "error",
      "object-shorthand": "off",
      "prefer-template": "warn",
      "complexity": ["error", 10],
    },
  },
  pluginJs.configs.recommended,
];
