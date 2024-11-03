<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref,getCurrentInstance } from 'vue';
import { userStore } from '@/store/user.ts'

const user = userStore()
const account=ref('');
const pwd=ref('');
let isErr = ref(false);
let errMsg = ref("");
let {proxy} =getCurrentInstance()

// 登录
function login(){
  proxy.$http({
    url:"/user/log",
    method:'post',
    params:{
      "account":account.value,
      "pwd":pwd.value
    }
  }) .then(function (response) {
     //错误判断
     if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
    //修改当前用户信息
    user.setUser(response.data.data)
    localStorage.setItem('uid',user.uId)
    console.log(user.uName);
    
    //跳转页面
    proxy.$router.push('/index');
    
    console.log(response.data.data);
    console.log(user.uName);
  })
  .catch(function (error) {
    console.log(error);
  });
  
}


</script>

<template>
      <div class="inputs">
        <el-input v-model="account" style="width: 240px;margin-bottom: 10px;" placeholder="输入您的账号" />
        <el-input v-model="pwd" type="password" style="width: 240px" placeholder="输入您的密码" />
        <span style="color: red; font-size: 12px" v-show="isErr">{{ errMsg }}</span>
      </div>
      <div class="btns">
        <el-button type="primary"  style="background-color: #fcc900; border: #fcc900;" @click="login">登陆</el-button>
        <el-button type="primary"  style="background-color: #fcc900; border: #fcc900;">
          <RouterLink to="/zhuce" style="text-decoration: none;"><span style="color: white;">注册</span></RouterLink>
          <RouterView />
        </el-button>
      </div>
</template>

<style scoped>
.inputs {
  width: 241px;
  height: 110px;
}

.inputs input {
  width: 90%;
  height: 30px;
  margin: 10px 0 0 0;
}

.btns {
  width: 200px;
  height: 40px;
}

.btns button {
  height: 30px;
  width: 40%;
  margin: 0 0 0 10px;
}
a:hover{
  color: fcc900;
}
</style>
