<script setup lang="ts">
import {reactive, ref} from 'vue'
import axios from "axios";
import {Bottom} from '@element-plus/icons-vue'

interface Item {
    url: string,
    name: string,
    size: number,
    birthtime: string,
    mtime: string
}

const files = reactive<Item[]>([])


axios.get("/api").then(res => {
    console.log(res.data)
    res.data.forEach((item: Item) => files.push(item))
}).catch(e => {
    console.error(e)
})

const avatar = ref<string>('https://q1.qlogo.cn/g?b=qq&nk=2192492965&s=100')

</script>

<template>
    <el-scrollbar class="demo-image__lazy w-100">
        <el-container style="background:#eefbff;">
            <el-header style="background:#d9ecff" class="h-10">
                <el-row>
                    <el-col :span="12" class="py-3">
                        <el-row :gutter="5">
                            <el-col :xs="9" :sm="6" :md="4">
                                <el-avatar
                                    :src="avatar"
                                    size="large"
                                />
                            </el-col>
                            <el-col :xs="15" :sm="18" :md="6">
                                <el-text
                                    type="info"
                                    size="large"
                                    class="h-100"
                                    style="display: flex;align-items: center"
                                >qiuluo's pics
                                </el-text>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8"
                            v-for="(f,i) in files"
                            :key="f.url"
                    >
                        <el-card
                            shadow="hover"
                            :body-style="{ padding: '0px' }"
                            class="my-20"
                        >
                            <div class="download">
                                <a :href="f.url" download>
                                    <el-button :icon="Bottom" :size="'small'" text circle/>
                                </a>
                            </div>
                            <el-image
                                :src="f.url"
                                class="w-100 h-100 img"
                                :preview-src-list="files.map(item=>item.url)"
                                :initial-index="i"
                                :loading="'lazy'"
                                lazy
                            >
                            </el-image>
                        </el-card>
                    </el-col>
                </el-row>
                <el-backtop :right="5" :bottom="10"/>
            </el-main>
        </el-container>
    </el-scrollbar>
</template>

<style scoped>
*{
    user-select: none;
}

.img {
    padding-bottom: 0;
    /*width: 100%;*/
    /*height: 100% !important;*/
}

.demo-image__lazy {
    width: 100%;

    overflow-y: hidden;
    overflow-x: hidden;
}

.demo-image__lazy .el-image {
    display: block;
    min-height: 200px;
    margin-bottom: 10px;
}

.demo-image__lazy .el-image:last-child {
    margin-bottom: 0;
}

.el_card {
    position: relative;
}

.download {
    position: absolute;
    z-index: 99;
}
</style>
