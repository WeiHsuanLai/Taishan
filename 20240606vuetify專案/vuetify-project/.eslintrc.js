module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:vue-pug/vue3-recommended', 'eslint:recommended', '@vue/standard'],
  rules: {
    'vue/multi-word-component-names': 'off',
    indent: 'off',
    'prettier/prettier': 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'one-var': 'off',
    'comma-dangle': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/return-in-computed-property': 'off'
  },
  reportUnusedDisableDirectives: true
}
