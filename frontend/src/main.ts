import {createApp} from 'vue'
import './style.css'
import './global.scss'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app=createApp(App)
app.use(ElementPlus as any)
app.mount('#app')
