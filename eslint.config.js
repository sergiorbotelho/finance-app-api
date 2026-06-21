import pluginJs from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
