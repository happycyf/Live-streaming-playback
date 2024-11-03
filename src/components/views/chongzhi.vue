<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

</script>

<template>
    <div>
        <div class="zfb-top">
            <h1>收银台</h1>
        </div>
        <div class="zfb-enter">
            <span class="fzb-je">支付金额：&nbsp;&nbsp;<span class="fzb-price">￥200</span></span>
            <span class="fzb-sq">申请单号：&nbsp;&nbsp;&nbsp;<span class="fzb-odd">ZF20545165</span></span>
        </div>
        <h3 class="h3" style="color: #fcc900;">金币充值</h3>
        <div class="w">
            <el-button type="primary" plain>
                <div>
                    <span>充值金币：<span style="color: #fcc900;">1</span></span>
                </div>
            </el-button>
            <el-button type="primary" plain>
                <div>
                    <span>充值金币：<span style="color: #fcc900;">10</span></span>
                </div>
            </el-button>
            <el-button type="primary" plain>
                <div>
                    <span>充值金币：<span style="color: #fcc900;">100</span></span>
                </div>
            </el-button>
            <el-button type="primary" plain style="padding-right: 0px;">
                <div>
                    <span>充值金币：<span style="color: #fcc900;"><input type="text" style="outline: none; height: 24px;" placeholder="最低充值1金币"></span></span>
                </div>
            </el-button>  
        </div>
        <div style="margin-top: 50px;text-align: center;margin-bottom: 50px;"><el-button type="primary">充值</el-button></div>
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
</template>

<style scoped>
          div.zfb-top{
            border-bottom: 5px solid #fcc900;
            padding-bottom: 10px;
        }
        div.zfb-top h1{
            font-size: 36px;
            margin-left: 300px;
            margin-top: 120px;
        }
        div.zfb-enter{
            line-height: 80px;
            width: 100%;
            background-color: ghostwhite;
        }
        div.zfb-enter .fzb-je{
            margin-left: 300px;
        }
        div.zfb-enter .fzb-sq{
            margin-left: 300px;
        }
        div.zfb-enter .fzb-price{
            color: red;
        }
        .w{
            text-align: center;
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
</style>
