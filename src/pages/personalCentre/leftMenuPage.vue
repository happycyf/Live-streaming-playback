<template>
    <el-row class="tac">
          <el-col>
            <h3 style="padding: 10px 0 0 25px">个人中心</h3>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#fff"
              text-color="#333"
              el-menu-active-color="#333"
            >
              <router-link to="/psl">
                <el-menu-item index="1" class="xuanxiang">
                  <el-icon><UserFilled /></el-icon>
                  <span>我的信息</span>
                </el-menu-item>
              </router-link>
              <router-link to="/att">
                <el-menu-item index="2" class="xuanxiang">
                  <el-icon><CirclePlus /></el-icon>
                  <span>关注</span>
                </el-menu-item>
              </router-link>
              <router-link to="/hty">
                <el-menu-item index="3" class="xuanxiang">
                  <el-icon><View /></el-icon>
                  <span>观看记录</span>
                </el-menu-item>
              </router-link>
              <!-- <router-link to="/msg">
                <el-menu-item index="4" class="xuanxiang">
                  <el-icon><ChatLineRound /></el-icon>
                  <span>我的消息</span>
                </el-menu-item>
              </router-link> -->

            </el-menu>
          </el-col>
        </el-row>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const menu = [
  {
    name: "我的信息",
    icon: Document,
    path: "/psl",
  },
  {
    name: "关注",
    icon: IconMenu,
    path: "/att",
  },
  {
    name: "观看记录",
    icon: Location,
    path: "/hty",
  },
  {
    name: "我的消息",
    icon: Setting,
  }
]
</script>

<style>
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
.content {
  padding: 30px;
}
.xuanxiang {
  text-align: left;
}
.xuanxiang a {
  color: #333;
}
</style>