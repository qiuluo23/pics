import Router from "koa-router";
import fs from 'fs'


const router =new Router({prefix:"/api"})

fs.readdirSync(__dirname)
    .filter(item=>item!=="index.ts")
    .forEach(async item=>{
        const {default:r}=await import("./"+item)
        router.use(r.routes())
    })


export default router