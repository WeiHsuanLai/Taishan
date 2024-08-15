module.exports = {
  extends: ['plugin:vue/essential', '@vue/standard', 'eslint:recommended'],
  rules: {
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
  // eslint-disable 警告不會回報
  reportUnusedDisableDirectives: true
}
