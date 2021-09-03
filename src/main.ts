/* vue3中通过 createApp函数创建根实例，vue2中通过 new Vue()创建  */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router).use(store).use(ElementPlus)

app.mount('#app')
