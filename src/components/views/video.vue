<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="center">
        <h2 style="padding-top: 20px;padding-left: 50px;padding-bottom: 20px">视频推荐</h2>
        <el-row>
            <el-col :span="5" v-for="(o, index) in 16" :key="o" :offset="index > 0 ? 1 : 1"
                style="margin-bottom: 30px;">
                <a href="" style="text-decoration: none;">
                    <el-card :body-style="{ padding: '0px' }">
                        <img src="/image1.jpg" class="image">
                        <el-row style="padding: 14px;">
                            <el-col class="touxiang" :span="6">
                                <el-avatar src="/image1.jpg" />
                            </el-col>
                            <el-col :span="18">
                                <span>好吃的汉堡</span>
                                <div class="bottom clearfix">
                                    <time class="time">{{ time }}</time>
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </a>
            </el-col>
        </el-row>
    </div>


</template>

<script setup lang="ts">
const currentDate = new Date()
const time = currentDate.toLocaleString()
console.log(time)
</script>

<style scoped>
* {
padding: 0px;
margin: 0px;
/* height: 100%; */
overflow: hidden;
}
.center {
width: 80%;
margin: auto;

}

.time {
font-size: 13px;
color: #999;
}

.bottom {
margin-top: 13px;
line-height: 12px;
}

.button {
padding: 0;
float: right;
}

.image {
width: 100%;
display: block;
}

.clearfix:before,
.clearfix:after {
display: table;
content: "";
}

.clearfix:after {
clear: both
}

.example-pagination-block+.example-pagination-block {
margin-top: 10px;
}

.example-pagination-block .example-demonstration {
margin-bottom: 16px;
}</style>