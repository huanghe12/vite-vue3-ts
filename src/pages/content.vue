<template>
	<div class="content">
		<h2>将来要做什么：{{ todo.text }}</h2>
		<h2>状态：<input v-model="checked" type="checkbox" />{{ todo.done ? '已完成' : '未完成' }}</h2>
	</div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'content',
	setup() {
		const route = useRoute()
		const todo = reactive({
			text: route.query.text,
			done: route.query.done
		})
		const checked = ref(todo.done)
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
			(value) => {
				todo.done = !!value
			},
			{
				deep: true // 深度监听
			}
		)
		return {
			route,
			todo,
			checked
		}
	}
})
</script>

<style scoped></style>
