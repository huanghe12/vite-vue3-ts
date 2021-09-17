<template>
	<div>
		<ul>
			<li v-for="todo in todos" :key="todo.id">{{ todo.id + 1 }}--{{ todo.task }}</li>
		</ul>
	</div>
</template>
<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const { state } = useStore()
/*
	computed(官网说的:)
		接收getter函数并为getter返回的值返回一个不可变得ref对象
		或者
		使用一个带有get和set的函数的对象来创建一个可写的ref对象
*/
const todos = computed(() => state.user.todos)
</script>
