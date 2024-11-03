<template>
    <ul>
      <router-link to="/msg/chat">
        <li class="friend-user">
          <el-row class="friend-user-row">
            <el-col :span="8" class="friend-user-img">
              <img src="/陆小果.jpg" alt="" class="img" />
            </el-col>
            <el-col :span="16" class="friend-user-name"> 豆奶爱喝奶 </el-col>
            
            <el-col :span="8" class="friend-user-img">
              <img src="/陆小果.jpg" alt="" class="img" />
            </el-col>
            <el-col :span="16" class="friend-user-name"> 豆奶爱喝奶 </el-col>
            <el-col :span="8" class="friend-user-img">
              <img src="/陆小果.jpg" alt="" class="img" />
            </el-col>
            <el-col :span="16" class="friend-user-name"> 豆奶爱喝奶 </el-col>
          </el-row>
        </li>
      </router-link>
    </ul>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style>
  ul > li {
    list-style: none;
  }
  .friedn-user {
    padding: 10px 0;
  }
  .friend-user-row {
    margin: 6px 0;
  }
  .friend-user-img {
    height: 60px;
    width: 60px;
    line-height: 60px;
    padding-left: 10px;
  }
  .friend-user-name {
    font-size: 16px;
    height: 60px;
    line-height: 60px;
  }
  .img {
    height: 100%;
    border-radius: 50%;
  }
  </style>