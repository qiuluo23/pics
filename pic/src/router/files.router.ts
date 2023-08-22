import Router from "koa-router";
import fs from 'fs'
import path from "path";
import multer from 'koa-multer'


const router = new Router();
const UploadPath = path.resolve(__dirname, "../../public")
const upload = multer({
    dest: UploadPath,
    limits:{
        fileSize:5*1024*1024 // 5MB
    }
})


router.get("/", async (ctx) => {
    ctx.body = fs.readdirSync(UploadPath).map(item => {
        const obj = {
            url: `http://${ctx.host}/static/${item}`,
            name: item.split('.')[0],
            size:0,
            birthtime:new Date(),
            mtime : new Date()
        }
        fs.stat(UploadPath, (err, stats) => {
                obj.size  = stats.size
                obj.birthtime = stats.birthtime
                obj.mtime = stats.mtime

        })
        return obj
    })
})

router.post("/", upload.single("file"), async (ctx) => {
    ctx.req.file
})

export default router
