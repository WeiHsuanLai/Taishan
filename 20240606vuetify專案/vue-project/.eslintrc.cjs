/* eslint-env node */
module.exports = {
	root: true,
	extends: ['plugin:vue/vue3-essential', 'plugin:vue-pug/vue3-recommended', 'eslint:recommended', '@vue/standard'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		// 其他规则...
		indent: ['error', 2] // 2代表使用2个空格进行缩进
	}
}
