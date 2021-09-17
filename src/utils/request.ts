import axios from 'axios'

const service = axios.create({
	// baseURL: '',
	timeout: 10000
	// headers: {}
})
// 发起请求之前的拦截器
service.interceptors.request.use(
	(config: any) => config,
	(error: any) => Promise.reject(error)
)

// 相应拦截器
service.interceptors.response.use(
	(response: any) => {
		const res = response.data
		// console.log(response.data.query)
		if (response.status === 200) {
			return res
		}
	},
	(error: any) => {
		Promise.reject(error)
	}
)

export default service
