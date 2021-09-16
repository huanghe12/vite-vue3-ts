<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

interface NewData {
	hits: any[]
	query: string
}
const state = reactive<NewData>({
	hits: [],
	query: 'vue'
})
/*
	在mounted阶段请求数据
	fetch() 接收一个字符串作为参数,默认向网址发出get请求,返回一个Promise对象
	xxx.json() 是一个异步操作，去除所有内容，并将其转为JSON对象
*/
onMounted(async () => {
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
	try {
		const res = await fetch(`http://hn.algolia.com/api/v1/search?query=${state.query}`)
		const data = await res.json()
		state.hits = data.hits
	} catch (error) {
		console.log(error)
	}
})
</script>

<template>
	<el-input v-model="state.query" />
	<ul>
		<li v-for="item in state.hits" :key="item.objectId">
			<a :href="item.url">{{ item.url }}</a>
		</li>
	</ul>
</template>
<style lang="less" scoped>
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
