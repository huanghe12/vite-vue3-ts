/*
    采用ts编码，定义routes变量时，需要声明类型为Array<RouteRecordRaw>
    在vue-router@4.0中，提供两种创建history的方式，分别是createWebHistory和createWebHashHistory
    在vue3中，通过defineAsyncComponent定义异步组件
			对异步组件进行配置，component被重命名为loader，且不再接受resolve和reject，且必须返回一个Promise
				const child = defineAsyncComponent({
					loader: () => import('@/components/async-component-child.vue')
					delay: 200,
					timeout: 3000
				})
		上述方法只适用于异步组件,对于路由懒加载无效.Vue2的路由懒加载怎么写,Vue3就怎么写
		路由懒加载与异步组件的区别:
			简单来说,写在路由配置文件中的异步加载就是路由懒加载的用法,写在组件内部的异步加载就是异步组件用法!!!
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = () => import('../pages/home.vue')
const Content = () => import('../pages/content.vue')

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home'
	},
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/content',
		name: 'content',
		component: Content
	}
]
const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
