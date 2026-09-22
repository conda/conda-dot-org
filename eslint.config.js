const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");
const globals = require("globals");

module.exports = [
  {
    // .pixi/ vendors its own shell/terminfo JS that isn't ours to lint; static/js/count.js is
    // a third-party GoatCounter script (already excluded from the prettier pre-commit hook for
    // the same reason) that defines its own `goatcounter` global.
    ignores: [
      "build/**",
      ".docusaurus/**",
      ".pixi/**",
      "node_modules/**",
      "bin/banner/**",
      "static/js/count.js",
    ],
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    files: ["src/**/*.{js,jsx}"],
    ...react.configs.flat.recommended,
  },
  {
    files: ["src/**/*.{js,jsx}"],
    ...jsxA11y.flatConfigs.recommended,
  },
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: reactHooks.configs.flat.recommended.rules,
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // Docusaurus's webpack aliases (@site, @theme, @docusaurus/*) aren't resolvable by any
      // static import resolver; this rule would otherwise flag every aliased import as broken.
      "import/no-unresolved": "off",
      // This codebase has never used PropTypes (no `prop-types` dependency, no existing
      // annotations); enabling this would require adopting a new validation convention as a
      // side effect of a lint version bump. Revisit separately if PropTypes (or TypeScript)
      // is ever adopted.
      "react/prop-types": "off",
    },
  },
];
