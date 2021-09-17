<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'content',
	setup() {
		// useRoute 相当于vue2中的this.$route,用于获取页面获取的参数
		const route = useRoute()
		const todo = reactive({
			text: route.query.text,
			// 路由传递之后会变为字符串类型,强制类型转换，!! 可以将变量转换为boolean类型
			done: !!route.query.done
		})
		const checked = ref(todo.done)
		// 声明 loading ,并声明类型为boolean
		const loading = ref<boolean>(false)
		/*
		 * 使用watch函数，方便在勾选复选框时，状态可以及时改变
		 * 不同于vue2中的watch选项，vue3中的watch是一个纯函数，并且可以多次使用
		 * 参数：
		 * 		1.监听目标
		 *    2.回调函数
		 *	  3.一个对象，包含深度监听和立即执行选项（可选）
		 * */
		watch(
			checked, // 监听对象
			// 回调函数,当监听对象发生变化时执行
			value => {
				todo.done = !!value
			},
			{
				deep: true // 深度监听
			}
		)
		// 模拟一个异步函数
		function asyncFn(age: number): Promise<number> {
			// 返回一个Promise对象
			return new Promise((resolve, reject) => {
				const err = '出错了'
				setTimeout(() => {
					if (checked.value) {
						// resolve返回正确值
						resolve(age)
					} else {
						// reject抛出异常
						reject(err)
					}
					loading.value = false
				}, 3000)
			})
		}
		function handleClick(): void {
			loading.value = true
			console.log(1)
			// 调用异步函数，通过 .then 获取返回值
			asyncFn(18)
				.then(res => {
					console.log('===>', res)
				})
				// 通过 .catch捕获异常
				.catch(err => {
					console.log('err', err)
				})
		}
		return {
			checked,
			todo,
			loading,
			handleClick
		}
	}
})
</script>

<template>
	<div class="content">
		<h2>将来要做什么：{{ todo.text }}</h2>
		<h2>状态：<input v-model="checked" type="checkbox" />{{ todo.done ? '已完成' : '未完成' }}</h2>
		<el-button type="primary" :loading="loading" @click="handleClick">click</el-button>
	</div>
</template>

<style scoped lang="less">
@a: 14px;
.content {
	h2 {
		font-size: @a;
	}
}
</style>
