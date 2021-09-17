<script lang="ts">
/*
	defineComponent函数,目的是定义一个组件 内部可以传入一个配置对象
  defineComponent函数对setup函数进行封装，返回options对象，最重要的是在ts下，给予组件正确的类型判断
  在vue3中，如果要定义基本数据类型作为响应式，需要使用ref，定义复杂数据类型作为响应式，需要使用reactive
  在vue3的setup函数中没有this，如果要使用路由，需要使用useRouter
*/
import { defineComponent, ref, reactive } from 'vue'
// 引入路由函数
import { useRouter, RouteLocationOptions } from 'vue-router'
// 定义接口Todo，规定数据类型
export interface Todo {
	id: number
	text: string
	done: boolean
}
// 暴露出去一个定义好的组件
export default defineComponent({
	name: 'Home',
	/*
	 * setup函数在创建组件之前执行，接受一个props参数和一个context参数，一旦props被解析，就做为组合式API的入口点
	 * 由于在之心setup时，组件实例尚未被创建，因此无法使用this，因此只能通过props访问组件中声明的属性
	 * 在vue3中不需要beforeCreate和create函数，在这两个函数中编写的代码应该直接放在setup里
	 *  */
	setup() {
		// 初始化路由,useRouter相当于vue2的this.$router
		const router = useRouter()
		// 使用ref定义todo，reactive定义todolist
		// 这里不用显示的添加约束类型，ts会根据ref接收的参数自动推断类型
		const todo = ref('这是我的第一个vite+vue3+ts项目！')
		const todolist = reactive<Array<Todo>>([
			{
				id: 1,
				text: 'learn ts',
				done: true
			},
			{
				id: 2,
				text: 'learn java',
				done: false
			}
		])
		const viewDetails = (item: Todo) => {
			/*
        通过push对象跳转路由，需要指定这个对象为RouteLocationOptions类型
        如果push的时字符串，就需要指定这个字符串类型为RouteLocationRaw
        这两个类型时vue-router提供的
      */
			router.push({
				path: '/content',
				query: {
					todoId: item.id,
					text: item.text,
					done: item.done
				}
			} as RouteLocationOptions)
		}
		// 返回定义的数据，方法，以便于模版渲染时使用
		return {
			todo,
			todolist,
			viewDetails,
			router
		}
	}
})
</script>

<template>
	<div>
		<!-- 从setup中返回的refs在模版中访问时会自动展开，因此模版中不需要 .value -->
		<div>{{ todo }}</div>
		<ul>
			<li v-for="(item, index) in todolist" :key="index" @click="viewDetails(item)">
				{{ index }}-{{ item.text }} --- {{ item.done }}
			</li>
			<el-button type="primary">点我一下</el-button>
		</ul>
		<el-button @click="router.push('/todo/ToDoHome')">count</el-button>
		<el-button @click="router.push('/news')">news</el-button>
	</div>
</template>

<!-- 使用less，npm install less less-loader --save -->
<style scoped lang="less">
ul {
	li {
		cursor: pointer;
		color: #ff5a4b;
	}
}
</style>
