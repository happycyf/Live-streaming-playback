<template>
  <!-- 右侧内容 -->
  <el-col><h2>观看历史</h2></el-col>
  <div class="history">
    <el-row class="list">
     
      <el-col :span="7" class="list-element" v-for="l in list" :key="l">
          <el-row>
            <el-col :span="10" class="list-element-img">
              <el-avatar
                shape="square"
                class="img"
                :size="100"
                :src="l.img"
              ></el-avatar>
            </el-col>
            <el-col :span="14" class="anchor-info">
              <h4>{{ l.uName }}</h4>
              <el-row>
                <el-col :span="24">关注数:<span>{{ l.attention }}</span></el-col>
                <el-col :span="24">粉丝数:<span>{{ l.fan }}</span></el-col>
              </el-row>
            </el-col>
          </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref,getCurrentInstance } from "vue";
let list=ref([])
const {proxy}=getCurrentInstance()
let ListAcount = localStorage.getItem("ListAcount").split(",");
for (let index = 0; index < ListAcount.length; index++) {
  proxy.$http({
    url:"/user/findByAccount",
    params:{
      "account":ListAcount[index]
    }
  }).then(response=>{
    let l={}
    l.uName=response.data.data.uName
    l.img="http://localhost:8080/avatarImg/"+response.data.data.img
    l.attention=response.data.data.attention
    l.fan=response.data.data.fan
    list.value.push(l)
})
}






</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
ul > li {
  list-style: none;
}
.body {
  height: 913px;
  width: 100%;
  background-color: #f2f2f3;
  color: #333;
  padding-top: 30px;
}
.box {
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 auto;
  width: 1080px;
  height: 880px;
}
.content {
  padding: 30px;
}
.history {
  margin-top: 20px;
  max-height: 760px;
  overflow-y: auto;
}
.history-time {
  margin-bottom: 15px;
}
.list a {
  color: #333333;
}
.list-element-img {
  height: 100px;
  width: 100px;
}
.state {
  position: absolute;
  height: 18px;
  width: 45px;
  left: 55px;
  background-color: #ff8800;
  color: white;
  font-size: 12px;
  text-align: center;
}
.list-element {
  height: 100px;
  background-color: #f7f7f7;
  margin: 0 20px 20px 0;
}
.anchor-info {
  padding-left: 10px;
}
.anchor-info > h4 {
  padding: 15px 0 14px 0;
}
.block {
  margin-left: 265px;
}
.line {
  margin-top: 12px;
  border-top: #dddddd solid 1px;
}
</style>
