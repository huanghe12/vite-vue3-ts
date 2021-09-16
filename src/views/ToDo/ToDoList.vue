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
const todos = computed(() => state.user.todos)
</script>
