module.exports = {
	settings: {
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.json'],
		// 这个是解决引入时没后缀查不到的问题
		'import/resolver': {
			node: {
				path: ['src'],
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] // 配置文件扩展名
			},
			// 解决别名报错的问题 需要npm install eslint-import-resolver-alias -D
			alias: {
				map: [['@', './src']],
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
		'plugin:prettier/recommended', // 添加 prettier 插件
		'prettier'
		// 'plugin:import/typescript'
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		'no-console': 'off', // 解决 Unexpected console statement.(no-console)
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
		'no-param-reassign': [2, { props: false }], // no-param-reassign
		'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }], // 跳过单行类的末尾换行检查，多行类必须换行
		'max-classes-per-file': ['error', 2], // 此规则强制每个文件只能包含特定数量的类，而不能包含更多类
		'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }], // 确保 Promise 只使用 Error 对象拒绝，allowEmptyReject: true (默认为 false) 允许调用不带参数的 Promise.reject()
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 允许一元运算符
		// html无子元素标签自动闭合
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'always',
					component: 'always'
				},
				svg: 'always',
				math: 'always'
			}
		],
		'no-shadow': 'off',
		'vue/no-multiple-template-root': 'off', // vue2不支持根结点未非单个节点,但vue3支持,所以关掉
		'vue/valid-template-root': 'off' // vue3允许html模版中没有根标签
	}
}
