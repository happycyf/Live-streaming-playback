<template>
  <div class="message-title">{{ query.username }}</div>
  <div class="message-content"></div>
  <div class="message-send">
    <textarea placeholder="在这里输入内容..." maxlength="200"></textarea>
    <div class="send-btn">
      <el-button type="primary" plain>发送</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';
import { useRoute } from 'vue-router';

let route =useRoute()
let query = toRef(route,'query')
</script>

<style scoped>
.message-title {
  height: 6%;
  line-height: 220%;
  padding-left: 12px;
  font-size: 20px;
  border-bottom: #cccccc 1px solid;
}
.message-content {
  height: 70%;
  width: 100%;
  border-bottom: #cccccc 1px solid;
}
.message-send {
  height: 24%;
}
.message-send textarea {
  width: 599px;
  height: 114.5px;
  border: none;
  resize: none;
  color: #555;
  background-color: #f3f3f3;
  padding: 15px;
  line-height: 18px;
  outline: none;
}
.send-btn {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 30px;
}
.send-btn button {
  position: absolute;
  top: 0;
  right: 5px;
  height: 100%;
  width: 80px;
  background-color: #fff;
  border: #ccc 1px solid;
  color: #bbb;
}
</style>