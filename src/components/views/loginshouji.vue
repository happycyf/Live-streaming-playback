<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, getCurrentInstance } from "vue";
import { userStore } from "@/store/user.ts";

const user = userStore();
const phone = ref("");
const Yzm = ref("");
let isDisabled = ref(false);
let isErr = ref(false);
let errMsg = ref("");
let { proxy } = getCurrentInstance();

// 手机号登录
function logPhone() {
  // 发送请求
  proxy
    .$http({
      url: "/user/logPhone",
      method: "post",
      params: {
        phone: phone.value,
        Yzm: Yzm.value,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      //修改当前用户信息
      user.setUser(response.data.data);
      //跳转页面
      proxy.$router.push("/index");

      console.log(response.data.data);
      console.log(user.uName);
    })
    .catch(function (error) {
      console.log(error);
      isErr.value = true;
      errMsg.value = "验证码输入错误";
    });
}

//获取验证码
function getYzm() {
  if (isDisabled.value) return;
  if (phone.value.length != 11) {
    isErr.value = true;
    errMsg.value = "手机号格式不正确";
    return;
  } else {
    isErr.value = false;
  }

  proxy
    .$http({
      url: "/user/setKey",
      method: "get",
      params: {
        phone: phone.value,
      },
    })
    .then(function (response) {});

  //设置禁用状态
  isDisabled.value = true;

  // 10秒后取消禁用
  setTimeout(() => {
    isDisabled.value = false;
  }, 10000);
}
</script>

<template>
  <div class="inputs">
    <el-input
      v-model="phone"
      :color="{ '#fcc900': true }"
      style="margin-bottom: 10px; width: 280px"
      placeholder="输入您的手机号"
    />
    <el-row>
      <el-col :span="16">
        <el-input v-model="Yzm" style="width: 180px" placeholder="输入验证码" />
      </el-col>
      <el-col :span="6">
        <el-button
          :disabled="isDisabled"
          style="margin-left: 10px"
          @click="getYzm"
          >获取验证码</el-button
        >
      </el-col>
    </el-row>
    <span style="color: red; font-size: 12px" v-show="isErr">{{ errMsg }}</span>
  </div>
  <div class="btns">
    <el-button
      type="primary"
      @click="logPhone"
      style="background-color: #fcc900; border: #fcc900; margin-right: 20px"
      >登陆</el-button
    >
    <el-button
      type="primary"
      style="background-color: #fcc900; border: #fcc900"
    >
      <RouterLink to="/zhuce" style="text-decoration: none"
        ><span style="color: white">注册</span></RouterLink
      >
      <RouterView />
    </el-button>
  </div>
</template>

<style scoped>
.inputs {
  width: 274px;
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
  margin-left: -12px;
}

.btns button {
  height: 30px;
  width: 40%;
  margin: 0 0 0 10px;
}
a:hover {
  color: fcc900;
}
.disabled {
  pointer-events: none;
  color: gray;
  cursor: not-allowed;
}
</style>
