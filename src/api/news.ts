import request from '@/utils/request'
// 发起请求,为参数设置默认值
export function getNews(data: string = 'vue') {
	return request({
		// 接口路径
		url: `http://hn.algolia.com/api/v1/search?query=${data}`,
		// 请求类型 get/post
		method: 'get'
		// 请求时接口需要的参数,这里不需要,所以不写
		// data
	})
}
