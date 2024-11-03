<template>
  <h2>我的消息</h2>
  <div class="message">
    <el-row class="message-row">
      <el-col :span="6">
        <div class="message-menu">
          <!-- 选项卡  -->
          <div class="xuan">
            <el-row>
              <!-- 聊天 -->
              <el-col :span="12" style="border-right: 1px solid #cccccc">
                <RouterLink to="/msg/lately" style="height: 100%; width: 100%">
                  <div class="xuan-icon">
                    <el-icon style="text-align: center"
                      ><ChatDotRound
                    /></el-icon>
                  </div>
                </RouterLink>
              </el-col>
              <!-- 联系人 -->
              <el-col :span="12">
                <RouterLink to="/msg/friend" style="height: 100%; width: 100%">
                  <div class="xuan-icon">
                    <el-icon style="text-align: center"><User /></el-icon>
                  </div>
                </RouterLink>
              </el-col>
            </el-row>
          </div>
          <!-- 搜索 -->
          <div class="search">
            <el-input placeholder="搜索" v-model="text" style="width: 80%">
              <template #append>
                <el-button icon="Search">搜索</el-button>
              </template>
            </el-input>
          </div>
          <div class="friend">
            <RouterView name="people" />
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="message-body">
        <RouterView />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const text = ref("");
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
}
ul > li {
  list-style: none;
}
.message {
  margin-top: 20px;
  border: 1px solid #cccccc;
  height: 750px;
}
.message-row {
  height: 100%;
}
.message-menu {
  height: 100%;
  font-size: 24px;
  border-right: 1px solid #cccccc;
  background-color: #fbfbfb;
}
.message-menu a {
  color: #333333;
}
.xuan {
  border-bottom: #cccccc 1px solid;
}
.xuan-icon {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background-color: #eeeeee;
  text-align: center;
}
.search {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.friend {
  padding-top: 16px;
  height: 100%;
  max-height: 630px;
  overflow-y: auto;
}

.message-body {
  background-color: #f3f3f3;
}

</style>