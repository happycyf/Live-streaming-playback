<template>
  <!-- 右侧内容 -->
  <div class="title">
    <el-row>
      <el-col :span="5" class="photo">
        <el-avatar :src="user.img" :size="108"></el-avatar>
      </el-col>
      <el-col :span="18" class="introduct">
        <h2 class="user-name">
          {{ user.uName }}
        </h2>
        <p class="account">账号:&nbsp;&nbsp;2894974231</p>
        <el-row class="balance">
          <el-col :span="8"
            ><el-icon><Money /></el-icon>余额:&nbsp;&nbsp;{{
              user.blance
            }}</el-col
          >
          <el-col :span="12" style="height: 20px; line-height: 20px">
            <el-button
              style="background-color: #ff8800; width: 60px"
              size="default"
              type="primary"
              @click="ZfWindow = true"
              >充值</el-button
            >
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
  <div class="user-info">
    <div class="task-head">
      <el-row>
        <el-col :span="2"><h3>基本信息</h3></el-col>
        <el-col :span="17"><p class="line"></p></el-col>
        <el-col :span="5"
          >&nbsp;&nbsp;<a @click="UpdateWindow = true"
            ><el-icon style="color: deepskyblue"><Edit /></el-icon>编辑资料</a
          ></el-col
        >
      </el-row>
    </div>
    <div class="user-info-content">
      <el-row>
        <el-col :span="12" class="user-msg"
          ><span>性别:</span><span>{{ user.sex }}</span></el-col
        >
        <el-col :span="12" class="user-msg"
          ><span>地址:</span><span>{{ user.adress }}</span></el-col
        >
      </el-row>
    </div>
  </div>
  <div class="account-set">
    <el-row class="task-head">
      <el-col :span="2"><h3>账号设置</h3></el-col>
      <el-col :span="20"><p class="line"></p></el-col>
    </el-row>
    <div class="account-set-content">
      <el-row>
        <el-col :span="12">
          <el-row>
            <el-col :span="3"
              ><el-icon style="font-size: 38px"><Iphone /></el-icon
            ></el-col>
            <el-col :span="12">
              <div>
                <p><span>修改绑定手机</span></p>
                <p class="set-content">
                  已绑定:<span>{{
                    user.phone.substring(0, 3) +
                    "******" +
                    user.phone.substring(9, 11)
                  }}</span>
                </p>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button
                size="small"
                type="primary"
                plain
                class="update"
                @click="PhoneWindow = true"
              >
                修改手机<el-icon><ArrowRight /></el-icon>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="3"
              ><el-icon style="font-size: 38px"><Lock /></el-icon
            ></el-col>
            <el-col :span="12">
              <div>
                <p><span>修改密码</span></p>
                <p class="set-content">建议定期修改密码，保证账号安全</p>
              </div>
            </el-col>
            <el-col :span="4">
              <el-button
                size="small"
                type="primary"
                plain
                class="update"
                @click="PwdWindow = true"
              >
                修改密码<el-icon><ArrowRight /></el-icon>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>

  <!-- 充值窗口 -->
  <el-dialog v-model="ZfWindow" title="充值" width="600">
    <el-form>
      <el-form-item label="充值金额" :label-width="upWidth">
        <el-input v-model="price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="" :label-width="upWidth">
        <!-- 错误信息 -->
        <span style="color: red; font-size: 12px" v-show="isErr">{{
          errMsg
        }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(ZfWindow = false), (isErr = false)"
          >取消</el-button
        >
        <a :href="'http://localhost:8080/order/zfb?uId='+Number(user.uId)+'&price='+Number(price)">
        <el-button type="primary" > 立即支付 </el-button>
        </a>
      </div>
    </template>
  </el-dialog>

  
  <!-- 编辑资料窗口 -->
  <el-dialog v-model="UpdateWindow" title="编辑资料" width="600">
    <el-form>
      <el-form-item label="昵称：" :label-width="upWidth">
        <el-input v-model="newUName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别：" :label-width="upWidth">
        <el-select v-model="newSex" placeholder="请选择性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="地址：" :label-width="upWidth">
        <el-input v-model="newAdress" autocomplete="off" />
      </el-form-item>
      <el-form-item label="" :label-width="upWidth">
        <!-- 错误信息 -->
        <span style="color: red; font-size: 12px" v-show="isErr">{{
          errMsg
        }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(UpdateWindow = false), (isErr = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="upInfo"> 完成 </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改手机窗口1 -->
  <el-dialog v-model="PhoneWindow" title="手机号验证" width="600">
    <el-form>
      <el-form-item label="旧手机号：" :label-width="formLabelWidth">
        <el-input v-model="oldPhone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码：" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16" style="margin-right: 20px">
            <el-input v-model="Yzm1" autocomplete="off" />
          </el-col>
          <el-col :span="6">
            <el-button
              :disabled="isDisabled"
              style="margin-left: 10px"
              @click="getYzm(oldPhone)"
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <!-- 错误信息 -->
        <span style="color: red; font-size: 12px" v-show="isErr">{{
          errMsg
        }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(PhoneWindow = false), (isErr = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="yzPhone(oldPhone,Yzm1)"> 完成 </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改手机窗口2 -->
  <el-dialog v-model="PhoneWindow1" title="手机号换绑" width="600">
    <el-form>
      <el-form-item label="新手机号：" :label-width="formLabelWidth">
        <el-input v-model="newPhone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码：" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16" style="margin-right: 20px">
            <el-input v-model="Yzm2" autocomplete="off" />
          </el-col>
          <el-col :span="6">
            <el-button
              :disabled="isDisabled"
              style="margin-left: 10px"
              @click="getYzm(newPhone)"
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <!-- 错误信息 -->
        <span style="color: red; font-size: 12px" v-show="isErr">{{
          errMsg
        }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(PhoneWindow1 = false), (isErr = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="upPhone">
          完成
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 修改密码窗口 -->
  <el-dialog v-model="PwdWindow" title="修改密码" width="600">
    <el-form>
      <el-form-item label="手机号：" :label-width="formLabelWidth">
        <el-input v-model="Phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码：" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16" style="margin-right: 20px">
            <el-input v-model="pYzm" autocomplete="off" />
          </el-col>
          <el-col :span="6">
            <el-button
              :disabled="isDisabled"
              style="margin-left: 10px"
              @click="getYzm(Phone)"
              >获取验证码</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="新密码：" :label-width="formLabelWidth">
        <el-input type="password" v-model="newPwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth">
        <!-- 错误信息 -->
        <span style="color: red; font-size: 12px" v-show="isErr">{{
          errMsg
        }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="(PwdWindow = false), (isErr = false)"
          >取消</el-button
        >
        <el-button type="primary" @click="upPwd"> 完成 </el-button>
      </div>
    </template>
  </el-dialog>
  
</template>

<script  setup >
import { ref, getCurrentInstance } from "vue";
import { userStore } from "@/store/user.ts";

const user = userStore();
let { proxy } = getCurrentInstance();
let isDisabled = ref(false);
let isErr = ref(false);
let errMsg = ref("");


//防刷新
proxy.$http({
    url:"/user/findById",
    method:'post',
    params:{
      "uid": localStorage.getItem("uid"),
    }
  }) .then(function (response) {
    //修改当前用户信息
    user.setUser(response.data.data)
    console.log(user.uName);
  })
  .catch(function (error) {
    console.log(error);
  });

// 支付变量
const ZfWindow = ref(false);
const price = ref(0);


// 编辑资料变量
const UpdateWindow = ref(false);
const upWidth = "100px";
const newUName = ref("");
const newSex = ref("男");
const newAdress = ref("");


//编辑资料保存函数
function upInfo() {
  if (newUName.value == "") {
    isErr.value = true;
    errMsg.value = "昵称不能为空";
    return;
  }

  // 提交修改
  proxy
    .$http({
      url: "/user/upInfo",
      method: "post",
      params: {
        uId: user.uId,
        newUName: newUName.value,
        newSex: newSex.value,
        newAdress: newAdress.value,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      console.log("修改成功");
      //修改当前用户信息
      user.setUName(newUName.value);
      user.setSex(newSex.value);
      user.setAdress(newAdress.value);
      //关闭错误提示
      isErr.value = false;
      //关闭窗口
      UpdateWindow.value = false;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// 修改手机变量
const PhoneWindow = ref(false);
const PhoneWindow1 = ref(false);
const formLabelWidth = "120px";
const oldPhone = ref("");
const Yzm1 = ref("");
const Yzm2 = ref("");
const newPhone = ref("");

//获取验证码
function getYzm(phone) {
  if (isDisabled.value) return;
  console.log(phone);

  if (phone.length != 11) {
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
        phone: phone,
      },
    })
    .then(function (response) {
      console.log("获取验证码成功");
    });

  //设置禁用状态
  isDisabled.value = true;

  // 10秒后取消禁用
  setTimeout(() => {
    isDisabled.value = false;
  }, 10000);
}
//验证旧手机号函数
function yzPhone(phone,Yzm) {
  if (phone == "") {
    isErr.value = true;
    errMsg.value = "手机号不能为空";
    return;
  }
  if (Yzm == "") {
    isErr.value = true;
    errMsg.value = "验证码不能为空";
    return;
  }
  
  // 验证
  proxy
    .$http({
      url: "/user/yzPhone",
      method: "post",
      params: {
        "uId": user.uId,
        "phone": phone,
        "Yzm": Yzm,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      //关闭错误提示
      isErr.value = false;
      //关闭当前窗口
      PhoneWindow.value = false;
      //打开绑定窗口
      PhoneWindow1.value = true;
    })
    .catch(function (error) {
      console.log(error);
    });
}

//改绑手机号函数
function upPhone() {
  if (newPhone.value == "") {
    isErr.value = true;
    errMsg.value = "手机号不能为空";
    return;
  }
  if (newPhone.value.length != 11) {
    isErr.value = true;
    errMsg.value = "手机号格式不正确";
    return;
  } else {
    isErr.value = false;
  }
  if (Yzm2.value == "") {
    isErr.value = true;
    errMsg.value = "验证码不能为空";
    return;
  }

  // 验证
  proxy
    .$http({
      url: "/user/upPhone",
      method: "post",
      params: {
        "uId": user.uId,
        "newPhone": newPhone.value,
        "Yzm": Yzm2.value,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      //修改当前显示的手机号
      user.setPhone(newPhone.value);
      //关闭错误提示
      isErr.value = false;
      //关闭当前窗口
      PhoneWindow1.value = false;
    })
    .catch(function (error) {
      console.log(error);
    });
}

// 修改密码变量
const PwdWindow = ref(false);
const Phone = ref("");
const pYzm = ref("");
const newPwd = ref("");


//修改密码函数
function upPwd() {
  if (Phone.value == "") {
    isErr.value = true;
    errMsg.value = "手机号不能为空";
    return;
  }
  if (Phone.value.length != 11) {
    isErr.value = true;
    errMsg.value = "手机号格式不正确";
    return;
  } else {
    isErr.value = false;
  }
  if (pYzm.value == "") {
    isErr.value = true;
    errMsg.value = "验证码不能为空";
    return;
  }
  if (newPwd.value.length<5||newPwd.value.length>15) {
    isErr.value = true;
    errMsg.value = "密码必须大于等于5位小于等于15位";
    return;
  }
  
  console.log("开始验证手机号");
  
  // 验证手机号是否正确
  proxy
    .$http({
      url: "/user/yzPhone",
      method: "post",
      params: {
        "uId": user.uId,
        "phone": Phone.value,
        "Yzm": pYzm.value,
      },
    })
    .then(function (response) {
      //错误判断
      if (response.data.code == 1) {
        isErr.value = true;
        errMsg.value = response.data.message;
        return;
      }
      console.log("验证通过");
      
      //修改密码
      proxy
        .$http({
          url: "/user/upPwd",
          method: "post",
          params: {
            "uId": user.uId,
            "newPwd": newPwd.value,
            },
          })
          .then(function (response) {
            //错误判断
            if (response.data.code == 1) {
              isErr.value = true;
              errMsg.value = response.data.message;
              return;
            }
            //关闭错误提示
            isErr.value = false;
            //关闭当前窗口
            PwdWindow.value = false;
          })
          .catch(function (error) {
            console.log(error);
          });

        })
    .catch(function (error) {
      console.log(error);
    });

  
  
}


</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.account {
  padding: 10px 0;
}
.balance {
  height: 30px;
  line-height: 30px;
}
.balance a {
  color: #666666;
  font-size: 12px;
}
.line {
  margin-top: 9px;
  border-top: #999999 solid 1px;
}
.task-head {
  margin-top: 50px;
}
.task-head a {
  color: #666666;
}
.user-info-content {
  margin: 20px 0px;
  font-size: 14px;
}
.user-msg {
  height: 40px;
  line-height: 40px;
}
.account-set-content {
  margin: 35px 0;
}
.account-set-content a {
  color: #333;
}
.set-content {
  color: #999999;
  font-size: 12px;
}
</style>