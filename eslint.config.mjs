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

      "require-await": "error", // Disallows async functions which have no await expression
      "no-trailing-spaces": "error", // Disallow trailing whitespace at the end of lines
      "comma-dangle": ["error", "always-multiline"], // Require or disallow trailing commas

      // Enhance Readability
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "no-mixed-spaces-and-tabs": "warn",
      "space-before-blocks": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",

      "brace-style": ["error", 
                      "1tbs", 
                      { "allowSingleLine": true }], // Enforces one true brace style
      "comma-spacing": ["error", 
                       { "before": false, "after": true }], // Enforces consistent spacing before and after commas
      "key-spacing": ["error", 
                     { "beforeColon": false, "afterColon": true }], // Enforces consistent spacing between keys and values in object literal properties
      "keyword-spacing": ["error", 
                         { "before": true, "after": true }], // Enforces consistent spacing before and after keywords
      "no-lonely-if": "error", // Disallows if statements as the only statement in else blocks
      "no-multiple-empty-lines": ["warn", 
                                 { "max": 1, 
                                   "maxEOF": 1 }], // Disallows multiple empty lines
      "padded-blocks": ["warn", 
                       "never"], // Disallows padding within blocks

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
