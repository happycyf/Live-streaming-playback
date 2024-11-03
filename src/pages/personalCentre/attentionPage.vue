<template>
  <!-- 右侧内容 -->
  <el-row>
    <el-col :span="2">
      <h2>关注</h2>
    </el-col>
    <el-col :span="4" class="count">
      关注了<span>{{ list.length }}</span
      >位主播
    </el-col>
  </el-row>
  <div class="attention">
    <el-row class="list">
      <el-col :span="11" class="list-element" v-for="item in list" v-bind:key="item.uId"> 
        <a href="">
          <el-row>
            <el-col :span="7" class="list-element-img" >
              <el-avatar
                shape="square"
                class="img"
                :size="100"
                :src="item.img"
              ></el-avatar>
            </el-col>
            <el-col :span="10" class="anchor-info">
              <h4>{{ item.uname }}</h4>
              <el-row>
                <el-col :span="24">关注数:<span>{{item.attention}}</span></el-col>
                <el-col :span="24">粉丝数:<span>{{ item.fan }}</span></el-col>
              </el-row>
            </el-col>
            <el-col :span="6" class="attention-state">
              <button type="button" class="attention-button" @click="delAttention(item.uid)">已关注</button>
            </el-col>
          </el-row>
        </a>
      </el-col>
      
    </el-row>
  </div>
</template>

<script setup >
import { userStore } from "@/store/user.ts";
import { ref, getCurrentInstance } from "vue";

const user = userStore();
const { proxy } = getCurrentInstance();
const list=ref([]);

// 异步请求加载
proxy
  .$http({
    url: "/userAttention/findAll",
    method: "post",
    params: {
      "uId": user.uId,
    },
  })
  .then(function (response) {
    //错误判断
    if (response.data.code == 1) {
      isErr.value = true;
      errMsg.value = response.data.message;
      return;
    }
    list.value=response.data.data;
  })
  .catch(function (error) {
    console.log(error);
  });

  // 取消关注
  function delAttention(id){
    
    
    proxy
    .$http({
      url: "/userAttention/delAttention",
      method: "post",
      params: {
        "userUid": user.uId,
        "followUid": id,
      },
    })
    .then(function (response) {
      
    })
  }


  
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
.count {
  padding-top: 9px;
}
.count > span {
  color: #f60;
}
.attention {
  margin-top: 20px;
  max-height: 760px;
  overflow-y: auto;
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
  padding: 15px 0 8px 0;
}
.attention-state {
  padding-top: 35px;
}
.attention-button {
  height: 30px;
  width: 100px;
  color: white;
  font-weight: bold;
  background-color: #f9335e;
  border: none;
  border-radius: 5px;
}
.block {
  margin-left: 265px;
}
</style>