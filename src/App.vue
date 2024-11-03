<template>
  <div>
    <div class="head" v-if="user.uTypeId!=3">
      <img src="/icon.png" alt="Logo" class="logo" />
      <ul class="menu">
        <RouterLink to="/index">
        <li class="menu-item">首页</li>
        </RouterLink>
        <RouterLink to="/live">
        <li class="menu-item">直播</li>
        </RouterLink>
      </ul>
      <div class="search-container">
       
        <div class="icon-container" style="text-align: center; margin-left: 550px;">
          <div class="icon-text" style="width: 50px;" v-if="user.uId==0">
            <RouterLink to="/login">
            <el-icon style="font-size: 20px;">
            <User />
            </el-icon><br>
              <!-- 登录页面 -->
              登录</RouterLink>
          </div>
          <div class="icon-text" style="" v-else>
            <RouterLink to="/personalIndex">
            <el-icon style="font-size: 20px;width: 50px;">
            <User />
            </el-icon><br>
              <!-- 登录页面 -->
              个人</RouterLink>
          </div>
        </div>
        <div class="icon-container b">
          <div class="icon-text">
  
          </div>
        </div>
      </div>
    </div>
<!-- 超管 -->
<div class="head-chaoguan" v-else>
    <img src="/icon.png" alt="Logo" class="logo" width="89px"/>
    <ul class="menu-chaoguan">
      <RouterLink to="/SearchTheRoom">
        <li class="menu-item-chaoguan">查房</li>
      </RouterLink>
      <RouterLink to="/checkmoney">
        <li class="menu-item-chaoguan">查账</li>
      </RouterLink>
    </ul>
  </div>
    <div class="content" >
      <RouterView  />
    </div>
    <div class="footer">  
      <div class="links">  
        <div class="link-group">  
          <h4>友情链接</h4>  
          <ul>  
            <li>菜鸟教程</li>  
            <li>CSDN</li>  
            <li>哔哩哔哩</li>  
            <li>美和易思</li>  
            <li>ChatGPT</li>  
          </ul>  
        </div>  
        <div class="link-group">  
          <h4>主播帮助</h4>  
          <ul>  
            <li>新人主播指南</li>  
            <li>开播工具下载</li>  
            <li>开播教程引导</li>  
            <li>直播学院</li>  
            <li>安全门户</li>  
            <li>监测反舞弊举报</li>  
          </ul>  
        </div>  
        <div class="link-group">  
          <h4>产品下载</h4>  
          <ul>  
            <li>iPhone版</li>  
            <li>iPad版</li>  
            <li>Android版</li>  
            <li>Android Pad</li>  
            <li>TV版</li>  
            <li>PC版</li>  
            <li>Win10版/WP版</li>  
          </ul>  
        </div>  
        <div class="link-group">  
          <h4>关注我们</h4>  
          <ul>  
            <li>官方微博</li>  
            <li>贴吧交流</li>  
            <li>不良信息举报与举证</li>  
          </ul>  
        </div>  
      </div>  
      
      <div class="footer-info">  
        <p>关于我们 | Investor Relations | 加入我们 | 合作联系 | 友情链接</p>  
        <p>以上链接均为呈现效果并无实际作用</p>  
        <p>© 2024-现在 zaomeng.com 造梦工厂有限公司 版权所有 All Rights Reserved ZAOMENG</p>  
      </div>  
    </div>
  </div>  
    <RouterView name="login" /> 
  </template>
  
  <script setup>
  import { userStore } from '@/store/user.ts'
  
  const user = userStore()
  
  
  </script>
  
  <style>
  .text-button{
    background: none;
    border: none;
    padding: 1px;
    margin: 0;
    font-family: inherit;
    font-size: 16px;
    color: white;
  }
  .text-button:hover{
    border: none;
  }
  .head {
    width: 100%;
    background-color: #333;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    /* padding: 0 20px;  */
  }
  
  .logo {
    padding-left: 20px;
    height: 40px;
    margin-right: 15px;
  }
  
  .menu {
    display: flex;
    list-style: none;
    padding: 0;
    margin-left: 5%;
    position: relative;
  }
  
  .menu-item {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    padding: 10px;
    color: white;
  }
  
  .menu-item>a {
    text-decoration: none;
    color: white;
  }
  
  .menu-item:hover {
    color: #ffd04b;
  }
  
  .menu-item>a:hover {
    color: #ffd04b;
  }
  
  .menu-item::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: #ffd04b;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .menu-item:hover::after {
    transform: scaleX(1);
  }
  
  .dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 2;
    padding: 10px 0;
    min-width: 100px;
  }
  
  .menu-item:hover .dropdown {
    display: block;
  }
  
  .dropdown-item {
    padding: 8px 20px;
    cursor: pointer;
  }
  
  .dropdown-item:hover {
    background-color: #f0f0f0;
    
  }
  
  .search-container {
    position: relative;
    margin-left: 38%;
    display: flex;
    align-items: center;
  }
  
  .search-input {
    padding: 10px 45px 10px 45px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
  }
  
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    fill: #ccc;
  }
  
  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    color: aliceblue;
  }
  
  .icon-container:hover {
    color: #ffd04b;
  }
  
  .icon-text {
    font-size: 12px;
  }
  
  .icon-text>a {
    text-decoration: none;
    color: white;
  }
  
  .icon-text>a:hover {
    color: #ffd04b;
  }
  
  .history-dropdown {
    display: none;
    position: absolute;
    top: 45px;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 10px;
    z-index: 2;
  
  
  
  }
  
  .icon-container:hover .history-dropdown {
    display: block;
  }
  
  .b {
    display: none;
  }
  .footer {  
    background-color: #333;  
    padding: 20px;  
    text-align: center;  
    color: white; /* 添加这一行来设置底部字体为白色 */  
  }  
  .links {  
    display: flex;  
    justify-content: space-around;  
    margin-bottom: 20px;  
  }  
  .link-group {  
    flex: 1;  
  }  
  .link-group h4 {  
    font-weight: bold;  
    color: white; /* 确保链接分组标题颜色为白色 */  
  }  
  .link-group ul {  
    list-style: none;  
    padding: 0;  
  }  
  .link-group li {  
    margin: 5px 0;  
    color: rgba(255, 255, 255, 0.828); /* 确保列表项颜色为白色 */  
  }  
  .qr-code {  
    margin: 20px 0;  
  }  
  .footer-info {  
    font-size: 12px;  
    color: rgba(255, 255, 255, 0.716)
    ; /* 添加这一行来设置底部信息字体颜色为白色 */  
  }
  /* 超管部分样式 */
  .head-chaoguan {
    width: 100%;
    background-color: #333;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    /* padding: 0 20px;  */
  }
  
  .logo-chaoguan {
    padding-left: 20px;
    height: 40px;
    margin-right: 15px;
  }
  
  .menu-chaoguan {
    display: flex;
    list-style: none;
    padding: 0px;
    margin-left: 5%;
    position: relative;
  }
  
  .menu-item-chaoguan {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    padding: 10px;
    color: white;
  }
  
  .menu-item-chaoguan>a {
    text-decoration: none;
    color: white;
  }
  
  .menu-item-chaoguan:hover {
    color: #ffd04b;
  }
  
  .menu-item-chaoguan>a:hover {
    color: #ffd04b;
  }
  
  .menu-item-chaoguan::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background-color: #ffd04b;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  .menu-item-chaoguan:hover::after {
    transform: scaleX(1);
  }
  
  
  
  .menu-item:hover .dropdown {
    display: block;
  }
  
  .icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 72%;
    color: aliceblue;
  }
  
  .icon-container:hover {
    color: #ffd04b;
  }
  
  .icon-text {
    font-size: 12px;
  }
  
  .icon-text>a {
    text-decoration: none;
    color: white;
  }
  
  .icon-text>a:hover {
    color: #ffd04b;
  }
  </style>