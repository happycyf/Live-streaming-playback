<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="dialog" v-if="isshow">
    <div class="content">
      <a href="#" class="a" @click="close">x</a>
      <!-- 登录页面 -->
      <a class="fh" href="#" @click="close"
        ><el-icon><ArrowLeftBold /></el-icon>
        <RouterLink to="/login" style="color: #fcc900"
          >返回到登录页面</RouterLink
        >
      </a>
      <RouterView />
      <h4 style="color: #fcc900">注册</h4>
      <div class="btns">
        <el-input
          v-model="account"
          style="width: 240px; margin-bottom: 10px"
          placeholder="输入您要创建的账号"
          required="required"
        />
        <el-input
          v-model="pwd"
          type="password"
          style="width: 240px; margin-bottom: 10px"
          placeholder="输入您设置的密码"
          required="required"
        />
        <el-input
          v-model="rePwd"
          type="password"
          style="width: 240px; margin-bottom: 10px"
          placeholder="输入您确定的密码"
          required="required"
        />
        <el-input
          v-model="phone"
          style="width: 240px; margin-bottom: 10px"
          placeholder="输入您的手机号"
          required="required"
        />
        <el-row>
          <el-col :span="16">
            <el-input
              v-model="Yzm"
              style="width: 180px"
              placeholder="输入验证码"
              required="required"
            />
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
        <!-- <el-input v-model="input" style="width: 240px;margin-bottom: 10px;" placeholder="输入您的名称" /> -->
      </div>
      <el-button
        type="primary"
        @click="reg"
        style="background-color: #fcc900; border: #fcc900; margin-right: 20px"
        >注册</el-button
      >
    </div>
  </div>
</template>
  
<script setup >
import { ref, getCurrentInstance } from "vue";
import { userStore } from "@/store/user.ts";

const user = userStore();
const account=ref("");
const pwd = ref("");
const rePwd = ref("");
const phone = ref("");
const Yzm = ref("");
let isDisabled = ref(false);
let isErr = ref(false);
let errMsg = ref("");
let { proxy } = getCurrentInstance();

// 注册
function reg() {
  //信息验证
  if (account.value.length < 5||account.value.length > 15) {
    isErr.value = true;
    errMsg.value = "账号长度不能小于5位且不能大于15位"
    return;
  }
  if (pwd.value.length < 5||pwd.value.length > 15) {
    isErr.value = true;
    errMsg.value = "密码长度不能小于5位且不能大于15位"
    return;
  }
  if (pwd.value !=  rePwd.value) {
    isErr.value = true;
    errMsg.value = "两次密码不一致";
    return;
  }
  if (phone.value.length == 0) {
    isErr.value = true;
    errMsg.value = "手机号未输入";
    return;
  }
  if (phone.value.length != 11) {
    isErr.value = true;
    errMsg.value = "手机号格式不正确";
    return;
  }
  if (Yzm.value.length == 0) {
    isErr.value = true;
    errMsg.value = "验证码未输入";
    return;
  }
    
  isErr.value = false;
  
  
  // 发送请求
  proxy
    .$http({
      url: "/user/reg",
      method: "post",
      params: {
        account:account.value,
        pwd:pwd.value,
        phone: phone.value,
        phoneKey: Yzm.value,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      //跳转页面
      proxy.$router.push("/login");
    })
    .catch(function (error) {
      console.log(error);
      isErr.value = true;
      errMsg.value = response.data.message;
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

const isshow = ref(true);
const input = ref("");
function close() {
  this.isshow = false;
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
  background-color: rgba(0, 0, 0, 0.3);

  /* // 让登录窗口垂直水平居中 */
  display: flex;
  justify-content: center;
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
.btns {
  width: 247px;
  height: 250px;
  margin-left: -12px;
  position: relative;
}
.fh {
  font-size: 12px;
  text-decoration: none;
  color: #fcc900;
  position: absolute;
  top: 8px;
  left: 8px;
}
.fh:hover {
  color: red;
}
.a {
  font-size: 22px;
  text-decoration: none;
  color: #fcc900;
  position: absolute;
  top: 2px;
  right: 8px;
}
.a:hover {
  color: red;
}
</style>