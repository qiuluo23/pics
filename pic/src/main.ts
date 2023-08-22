import Koa from 'koa'
import KoaStatic from 'koa-static'
import mount from 'koa-mount'
import path from 'path'
import bodyParser from "koa-bodyparser"
import favicon from 'koa-favicon'
import jsonError from "koa-json-error";
import cors from 'koa2-cors'

import config from './config/default.config'
import router from './router/'


const app = new Koa()

app.use(cors())

// favicon设置
app.use(favicon(path.resolve(__dirname,"logo/favicon.ico")))

// post参数解析
app.use(bodyParser())

// 前端抛出
app.use(KoaStatic(path.resolve(__dirname,"../frontend/dist")))

// 静态资源
app.use(mount("/static",KoaStatic(path.resolve(__dirname,"../public")) as Koa.Middleware))

// 路由
app.use(router.routes())

// 统一错误处理
app.use(jsonError({
    postFormat: (error, { stack, ...rest }) => {
        return {
            code: error.status || 500,
            msg: error.message,
            data: rest,
            stack: process.env.NODE_ENV === 'production' ? null : stack
        }
    }
}))

// 端口监听
const {HOST,PORT} = config
app.listen(Number(PORT),HOST,()=>{
    console.log(`http://${HOST}:${PORT}`)
})