module.exports = {
	settings: {
		// 这个是解决引入时没后缀查不到的问题
		'import/resolver': {
			node: {
				path: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
			}
		}
	},
	globals: {
		// 解决cdn引入的提示未定义
		NProgress: 'readonly'
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'plugin:vue/essential',
		'airbnb-base',
		'plugin:prettier/recommended' // 添加 prettier 插件
		// 'plugin:import/typescript'
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		// 这个是解决不写后缀报错的问题
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
				json: 'never'
			}
		],
		'no-param-reassign': [2, { props: false }] // no-param-reassign
	}
}
