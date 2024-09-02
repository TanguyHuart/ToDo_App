module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier", // Disables conflicting ESLint rules
    "plugin:prettier/recommended",
  ],
  plugins: [],
  rules: {},
};
