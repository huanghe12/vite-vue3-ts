import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: './', // 打包路径, 类似publicPath，'./'避免打包访问后空白页面，要加上，不然线上也访问不了
	resolve: {
		alias: {
			// 如果报错__dirname找不到,需要执行npm install @types/node --save-dev
			'@': resolve(__dirname, './src') // 配置 @ 表示src
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'] // 导入时想要省略的扩展名
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets', // 指定静态资源存放路径
		sourcemap: false, // 是否构建source map文件
		terserOptions: {
			// 生产环境移除console
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	},
	server: {
		https: false, // 是否开启https
		port: 3000, // 服务端口号
		open: true, // 服务启动时是否自动打开浏览器
		cors: true, // 允许跨域
		host: '0.0.0.0',
		proxy: {
			'/api': {
				target: '', // 后台接口
				changeOrigin: true,
				secure: false, // 如果是https接口，需要配置这个参数
				// ws: true, // websoclet支持
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	// 引入第三方的配置
	optimizeDeps: {
		include: []
	}
})
