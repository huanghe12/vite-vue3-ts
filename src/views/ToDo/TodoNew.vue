<template>
	<div>
		<el-form @submit.native.prevent>
			<el-form-item>
				<el-input v-model="task" placeholder="Enter a new task" @keyup.enter.native="addToDo()" />
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { ref } from 'vue'

const { commit } = useStore()
const id = ref(0)
const task = ref('')
function addToDo() {
	commit('user/addToDo', { id: id.value, task: task.value })
	id.value += 1
	task.value = ''
}
</script>
