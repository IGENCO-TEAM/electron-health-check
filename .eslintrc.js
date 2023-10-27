module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  globals: {
    $: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/essential",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended"
  ],
  rules: {
    "prettier/prettier": "error",
    "vue/no-deprecated-slot-attribute": "off",
    "vue/no-deprecated-slot-scope-attribute": "off",
    "vue/no-mutating-props": "off",
    "vue/require-explicit-emits": "off",
    "vue/no-v-html": "off",
    "vue/no-parsing-error": [
      "error",
      {
        "abrupt-closing-of-empty-comment": true,
        "absence-of-digits-in-numeric-character-reference": true,
        "cdata-in-html-content": true,
        "character-reference-outside-unicode-range": true,
        "control-character-in-input-stream": true,
        "control-character-reference": true,
        "eof-before-tag-name": true,
        "eof-in-cdata": true,
        "eof-in-comment": true,
        "eof-in-tag": true,
        "incorrectly-closed-comment": true,
        "incorrectly-opened-comment": true,
        "invalid-first-character-of-tag-name": false,
        "missing-attribute-value": true,
        "missing-end-tag-name": true,
        "missing-semicolon-after-character-reference": true,
        "missing-whitespace-between-attributes": true,
        "nested-comment": true,
        "noncharacter-character-reference": true,
        "noncharacter-in-input-stream": true,
        "null-character-reference": true,
        "surrogate-character-reference": true,
        "surrogate-in-input-stream": true,
        "unexpected-character-in-attribute-name": true,
        "unexpected-character-in-unquoted-attribute-value": true,
        "unexpected-equals-sign-before-attribute-name": true,
        "unexpected-null-character": true,
        "unexpected-question-mark-instead-of-tag-name": true,
        "unexpected-solidus-in-tag": true,
        "unknown-named-character-reference": true,
        "end-tag-with-attributes": true,
        "duplicate-attribute": true,
        "end-tag-with-trailing-solidus": true,
        "non-void-html-element-start-tag-with-trailing-solidus": false,
        "x-invalid-end-tag": true,
        "x-invalid-namespace": true
      }
    ],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError"
        ]
      }
    ]
  }
};
