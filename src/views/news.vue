<script lang="ts" setup>
// eslint-disable-next-line no-unused-vars
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { getNews } from '@api/news'

interface NewsData {
	hits: any[]
	query: string
}
const state = reactive<NewsData>({
	hits: [],
	query: ''
})
// 创建一个loading表示加载中
const loading = ref(false)
/*
	在mounted阶段请求数据
	fetch() 接收一个字符串作为参数,默认向网址发出get请求,返回一个Promise对象
	xxx.json() 是一个异步操作，去除所有内容，并将其转为JSON对象
*/
// onMounted(async () => {
// 1.回调
// fetch('http://hn.algolia.com/api/v1/search?query=vue').then((res) => {
// 	res.json().then((data) => {
// 		state.hits = res.hits
// 	})
// })
// 2.第一种方式,链式调用
// fetch('http://hn.algolia.com/api/v1/search?query=vue')
// 	.then((data) => data.json())
// 	.then((res) => {
// 		state.hits = res.hits
// 	})
// 3.使用async await的方式,使用try catch捕获异常
// try {
// 	const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${state.query}`)
// 	const data = await res.json()
// 	state.hits = data.hits
// } catch (error) {
// 	console.log(error)
// }
// })
// 调用接口
function getNewsList(query?: string) {
	loading.value = true
	getNews(query).then((res: any) => {
		state.hits = res.hits
		loading.value = false
	})
	// .then和await都可以我习惯用.then,使用await要在函数前边加上async修饰符
	// const res: any = await getNews(query)
	// state.hits = res.hits
	// loading.value = false
}
// 重置搜索
function resetInput() {
	state.query = ''
	getNewsList()
}
// 在mounted时调用接口
onMounted(() => {
	getNewsList()
})
/*
	watchEffect 立即执行 传入的一个函数,同时响应式追踪其依赖,并在其依赖变更时重新运行该函数
*/
// watchEffect(() => {
// 	getNewsList(state.query)
// })
</script>

<template>
	<div class="form-wrap">
		<el-input v-model="state.query" placeholder="Enter a type" />
		<el-button type="primary" @click="getNewsList(state.query)">Search</el-button>
		<el-button type="primary" @click="resetInput()">Reset</el-button>
	</div>
	<ul v-loading="loading">
		<li v-for="item in state.hits" :key="item.objectId">
			<a :href="item.url">{{ item.url }}</a>
		</li>
	</ul>
</template>
<style lang="less" scoped>
.form-wrap {
	display: flex;
	.el-input {
		width: 800px;
		margin-right: 20px;
	}
}
ul {
	li {
		text-align: left;
		a {
			text-decoration: none;
			line-height: 30px;
		}
	}
}
</style>
