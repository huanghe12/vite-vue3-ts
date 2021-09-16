import { ElMessage } from 'element-plus'
// 定义接口
interface IState {
	todos: any[]
}
// 创建IState类型的state
const state: IState = {
	todos: []
}
const mutations = {
	addToDo(state: IState, item: any) {
		if (item.task !== '') {
			state.todos.unshift(item)
		} else {
			ElMessage.warning('Please enter the task！')
		}
	}
}
// 导出模块
export default {
	namespaced: true,
	state,
	mutations
}
