<template>
   <div class="body">
    <el-row class="box">
      <!-- 左侧导航栏 -->
      <el-col :span="4" class="menu">
        
        <routerView />

      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="20" style="padding: 30px;">
        
        <routerView name="body" />

      </el-col>
    </el-row>
  </div> 
  <!-- <div>
    <router-link to="supertube">超管页面</router-link>
    <routerView name="supertube" />
  </div> -->
</template>

<script lang="ts" setup>

</script>

<style scoped>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
ul > li {
  list-style: none;
}
.body {
  height: 929px;
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
.xuanxiang {
  text-align: left;
}
.xuanxiang a {
  color: #333;
}
</style>
