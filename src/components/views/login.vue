<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dialog" v-if="(isshow)">
    <div class="content">
      <h4>
        <RouterLink to="/login/admin" style="margin-left: 10px; text-decoration: none;color: #fcc900;"><span>账号登录</span></RouterLink>&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #fcc900;">/</span>&nbsp;&nbsp;
        <RouterLink to="/login/shouji" style="margin-right: 10px;text-decoration: none;color: #fcc900;"><span>手机号登录</span></RouterLink>
      </h4>
      <a href="#" class="a" @click="close">x</a>
      
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
export default{
  data() {
return {
  isshow:true
 }
 },
 methods:{
  close(){
    this.isshow=false
  }
}
 }
</script>

<style scoped>
.dialog {
  /* 脱离文档流，并设置背景为半透明的颜色 */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(0, 0, 0, 0.3);

  /* // 让登录窗口垂直水平居中 */
  display: flex;
  justify-content:center;
  align-items: center;

  /* // 保持登录窗口一直在页面最顶层 */
  z-index: 999;
}

.content {
  position: relative;
  width: 475px;
  height: 370px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.a{
  font-size: 22px;
  text-decoration: none;
  color: black;
 position:absolute;
 top: 2px;
 right: 8px;
}
.a:hover{
  color: red;
}
</style>