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
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    "vue/no-v-model-argument": "off",
    "vue/no-v-for-template-key": "off",
    "vue/no-multiple-template-root": "off",
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
    camelcase: "off",
    "import/order": "off",
    "import/no-named-as-default": "off",
  },
  globals: {
    $nuxt: true,
  },
};
