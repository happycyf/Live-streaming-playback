<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import { useRoute } from 'vue-router'

const route = useRoute()

const tKey = route.query.tKey
const account = route.query.account
const img = route.query.img
if (localStorage.getItem("ListAcount")==null) {
  localStorage.setItem("ListAcount",account)
}else{
  let item =localStorage.getItem("ListAcount").split(",")
  let flog =true
  for (let index = 0; index < item.length; index++) {
    if(item[index]==account){
      flog=false
    } 
  }
  if (flog) {
    localStorage.setItem("ListAcount",localStorage.getItem("ListAcount")+","+account)  
  }
  
}

import { getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import { userStore } from '@/store/user.ts'
import { ElMessage } from 'element-plus'

let { proxy } = getCurrentInstance()
const user = userStore()
let videoRef = ref()
let media = new MediaStream()
let pc = new RTCPeerConnection()


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
    console.log(user.blance);
    jinbi.value=user.blance
    erName.value=user.uName
  })
  .catch(function (error) {
    console.log(error);
  });


const selectGift = (gift) => {
  selectedGift.value = gift
}

onMounted(
  async () => {
    videoRef.value.srcObject = media
    pc.addTransceiver("audio", { direction: "recvonly" })
    pc.addTransceiver("video", { direction: "recvonly" })

    var offer = await pc.createOffer()
    await pc.setLocalDescription(offer)

    const answer = await new Promise((resolve, reject) => {
      console.log(`Generated offer: ${offer.sdp}`)
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        if (xhr.readyState !== xhr.DONE) return
        if (xhr.status !== 200 && xhr.status !== 201) return reject(xhr)
        const data = xhr.responseText
        console.log("Got answer: ", data)
        return data.code ? reject(xhr) : resolve(data)
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-type', 'application/sdp')
      xhr.send(offer.sdp)
    })

    await pc.setRemoteDescription(
      new RTCSessionDescription({ type: 'answer', sdp: answer }))
  })

pc.ontrack = function (event) {
  media.addTrack(event.track)
}

// 弹幕类
class Bullet {
  id
  status = 'waiting'
  content = ''
  track = 0
  isGift = false

  constructor(content, isGift = false) {
    this.id = new Date().getTime()
    this.content = content || ''
    this.track = Math.floor(Math.random() * 5) + 1
    this.isGift = isGift
  }
}

const name = ref("")
const text = ref("")
const erName = ref()
const isLoggedIn = user.uId
const jinbi = ref()
const isChatVisible = ref(true)
const isGiftsVisible = ref(false)
const messages = reactive([])
const gifts = ref([
  { user: "用户2", gift: 10 },
  { user: "用户3", gift: 100 }
])
const bullets = ref([])
const selectedGift = ref(null)

const bullet = new Bullet(text.value)

proxy.$http({
      url:"/show/getName",
      method:"post",
      params:{
        "account":account
      }
    }).then(response=>{
      console.log(response);
      
       name.value = response.data;
    })
watch(text, (newVal) => {
  if (bullet) {
    bullet.content = newVal
  }
})

const showChat = () => {
  isChatVisible.value = true
  isGiftsVisible.value = false
}

const showGifts = () => {
  isChatVisible.value = false
  isGiftsVisible.value = true
}
// 聊天室部分开始
let chatList = reactive([])
let url = "http://192.168.10.129:1985/rtc/v1/whep/?app=live&stream=" + tKey + ""
let ws = new WebSocket("ws://localhost:8080/userWebSocket/" + tKey + "") //这里后续要通过请求数据库改tkey
if (ws != null) {
  ws.onopen = function () {
    console.log("连接成功")
  }
  ws.onmessage = function (e) {
    console.log(e.data)
    let data = JSON.parse(e.data)
    if (data.instruction == null) {
      // 发送者的名字
      let sendUserName = data.sendUserName
      // 发送者的时间
      let sendTime = new Date(data.sendTime)
      // 发送者的消息
      let message = data.message
      chatList.push({
        sendUserName: sendUserName,
        sendTime: sendTime.getMonth() + 1 + "-" + sendTime.getDate() + "  " + sendTime.getHours() + ":" + sendTime.getMinutes() + ":" + sendTime.getSeconds(),
        message: message
      })
      //主播弹幕
      const nwBullet = new Bullet(message)
      bullets.value.push(nwBullet)
      nwBullet.status = 'running'
      bullets.value.forEach(b => {
        if (b.status === 'waiting') {
          b.status = 'running'
        }
      })
    }
  }
  ws.onclose = function () {
    console.log("连接断开")
  }
}
window.addEventListener("beforeunload", () => {
  console.log("进入");

  ws.onclose()
})
// 聊天室部分结束
const add = () => {
  if (isLoggedIn.value == 0) {
    ElMessage({ message: '请先登录再发送消息', type: 'warning', plain: true })
    return
  } else {
    if (!text.value.trim()) {
      ElMessage({ message: '请输入想发言的内容再发送', type: 'warning', plain: true })
      return
    }


    //消息弹幕
    const newBullet = new Bullet(text.value)
    bullets.value.push(newBullet)
    newBullet.status = 'running'
    bullets.value.forEach(b => {
      if (b.status === 'waiting') {
        b.status = 'running'
      }
    })

    // 将消息添加到聊天记录中
    const chatMessage = {
      instruction: "null",
      sendUserName: erName.value,
      sendTime: new Date().getTime(),
      message: text.value
    }


    chatList.push(chatMessage)
    ws.send(JSON.stringify(chatMessage))
    text.value = ""

  }
}
const addliwu = () => {

  if (selectedGift.value) {
    proxy.$http({
      url:"/show/addgiftrecord",
      method:"post",
      params:{
        "giftName":selectedGift.value.title,
        "uId":localStorage.getItem("uid"),
        "account":account,
      }
    }).then(response=>{
      console.log("礼物添加成功");
    })

    const giftPrice = selectedGift.value.price;

    if (user.blance >= giftPrice) {
      // 扣除金币
      user.blance -= giftPrice;
      jinbi.value = user.blance;

      const message = `赠送了 ${selectedGift.value.title}`;
      const bullet = new Bullet(message, true);
      bullets.value.push(bullet);
      bullet.status = 'running';

      const giftMessage = {
        instruction: "gift",
        sendUserName: erName.value,
        message: message,
        sendTime: new Date().getTime(),
        isGift: true
      };

      ws.send(JSON.stringify(giftMessage))


      chatList.push(giftMessage);

      // 查找并累加同一用户的礼物金额
      const existingGift = gifts.value.find(g => g.user === erName.value);
      if (existingGift) {
        existingGift.gift += selectedGift.value.price;
      } else {
        gifts.value.push({ user: erName.value, gift: selectedGift.value.price });
      }

      sortGifts();
      selectedGift.value = null;
    } else {
      ElMessage({ message: '金币不足，请充值后再尝试赠送礼物', type: 'warning', plain: true });
    }
  }
}

const done = (bullet) => {
  bullet.status = 'done'
  nextTick(() => {
    const index = bullets.value.indexOf(bullet)
    if (index > -1) {
      bullets.value.splice(index, 1)
    }
  })
}

const sortGifts = () => {
  gifts.value.sort((a, b) => b.gift - a.gift)
}

onMounted(() => {
  sortGifts()
})
//查询粉丝数
const fen =ref("")
//关注
const is = ref("")
     //查询粉丝数
     proxy.$http({
      url:"/show/getfan",
      method:"post",
      params:{
        "account":account,
      }
    }).then(response=>{
      fen.value = response.data;
    })
     //显示是否关注
     proxy.$http({
      url:"/show/chaxuuserattention",
      method:"post",
      params:{
        "account":account,
        "uId":localStorage.getItem("uid"),
      }
    }).then(response=>{
      console.log(user.uId);
      
      console.log(response.data);
      is.value = response.data;
    })


    //关注方法
const fens = () => {
    if (is.value == 0) {
    //添加关注
      proxy.$http({
      url:"/show/adduserattention",
      method:"post",
      params:{
        "account":account,
        "uId":user.uId,
      }
    }).then(response=>{
      
      
      is.value = 1;
    })
     //查询粉丝数
     proxy.$http({
      url:"/show/getfan",
      method:"post",
      params:{
        "account":account,
      }
    }).then(response=>{

      fen.value = response.data+1;
    })
     //显示是否关注
    //  proxy.$http({
    //   url:"/show/chaxuuserattention",
    //   method:"post",
    //   params:{
    //     "account":account,
    //     "uId":user.uId,
    //   }
    // }).then(response=>{
    //   is.value = response.data;
    // })
    } else {
      //删除关注
      proxy.$http({
      url:"/show/deluserattention",
      method:"post",
      params:{
        "account":account,
        "uId":user.uId,
      }
    }).then(response=>{
      is.value = 0;
    })
     //查询粉丝数
     proxy.$http({
      url:"/show/getfan",
      method:"post",
      params:{
        "account":account,
      }
    }).then(response=>{
      fen.value = response.data-1;
    })
     //显示是否关注
    //  proxy.$http({
    //   url:"/show/chaxuuserattention",
    //   method:"post",
    //   params:{
    //     "account":account,
    //     "uId":user.uId,
    //   }
    // }).then(response=>{
    //   is.value = response.data;
    // })
    }
}
</script>


<template>
  <div>
    <!-- 用户 -->
    <div class="F">
      <!-- 登录页面 -->
      <el-container>
        <el-container>
          <el-main>
            <div class="head1">
              <div class="left">
                <a href="#">
                  <el-avatar :src="img"></el-avatar>
                  <span>{{ name }}</span>
                </a>
              </div>
              <div class="right">
                <div>
                  <a href="#" class="dingyue" @click="fens">
                    <el-icon v-if="is==1">
                      <Select style="width: 1em; height: 1em;" />
                    </el-icon>
                    <el-icon v-else>
                      <CloseBold style="width: 1em; height: 1em;" />
                    </el-icon>
                    <span>{{fen}}</span>
                  </a>
                </div>
               
              </div>
            </div>
            <!-- 直播的视频 -->
            <div class="video" style="position: relative;overflow: hidden;">
              <video controls ref="videoRef" style="height: 800px;width: 100%;">
              </video>
              <div v-for="bullet in bullets" :id="bullet.id" :key="bullet.id"
                :class="['danmu-' + bullet.status + '-' + bullet.track]" @animationend="done(bullet)">
                {{ bullet.content }}
              </div>
            </div>
            <div class="liwubiao">
              <ul>
                <li>
                  <button @click="selectGift({ title: '棒棒糖', price: 1 })">
                    <img src="/1.jpg" title="棒棒糖" alt="加载失败" width="50px" height="45px" />
                    <p>￥1</p>
                  </button>
                </li>
                <li>
                  <button @click="selectGift({ title: '玫瑰花', price: 5 })">
                    <img src="/2.jpg" title="玫瑰花" alt="加载失败" width="50px" height="45px" />
                    <p>￥5</p>
                  </button>
                </li>
                <li>
                  <button @click="selectGift({ title: '礼物盒', price: 10 })">
                    <img src="/3.jpg" title="礼物盒" alt="加载失败" width="50px" height="45px" />
                    <p>￥10</p>
                  </button>
                </li>
                <li>
                  <button @click="selectGift({ title: '跑车', price: 100 })">
                    <img src="/4.jpg" title="跑车" alt="加载失败" width="50px" height="45px" />
                    <p>￥100</p>
                  </button>
                </li>
                <li>
                  <button @click="selectGift({ title: '直升机', price: 1000 })">
                    <img src="/5.jpg" title="直升机" alt="加载失败" width="50px" height="45px" />
                    <p>￥1000</p>
                  </button>
                </li>
              </ul>
              <span>金币：<span class="jinbi">{{ jinbi }}</span></span>
              <el-button type="primary" style="border-radius:8px;margin-left: 10px;" @click="addliwu">
                <span>赠送</span>
              </el-button>
            </div>
          </el-main>
        </el-container>
      </el-container>
      <!-- 右边评论区和礼物榜 -->
      <div class="right-head1">
        <!-- 评论区和礼物榜的导航栏 -->
        <div class="head2">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple" />
              <span class="button" @click="showChat">互动</span>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light" />
              <span class="button" @click="showGifts">礼物榜</span>
            </el-col>
          </el-row>
        </div>
        <!-- 评论区 -->
        <div v-if="isChatVisible" class="chat" style="border: 1px solid gainsboro;">
          <div class="content">
            <p v-for="(chat, index) in chatList" :key="index" style="position: relative;height: 25px;">
             {{ chat.sendUserName }} ：{{ chat.message }}
              <span style="position: absolute;right: 2px;bottom: 1px;font-size: 10px;">
                {{ new Date(chat.sendTime).toLocaleString() }}
              </span>
            </p>
          </div>
          <!-- 消息发送 -->
          <div>
            <el-input v-model="text" maxlength="100" style="width: 358px; height: 32px; border-radius: 8px 0px 0px 8px;"
              placeholder="请文明发言" show-word-limit type="text" />
            <el-button type="primary" style=" border-radius: 0px 8px 8px 0px;" @click="add">
              <span>发送</span>
            </el-button>
          </div>
        </div>
        <!-- 礼物榜 -->
        <div v-if="isGiftsVisible" class="gift-list">
          <div class="content" style="width: 377px;">
            <p v-for="(gift, index) in gifts" :key="index" style="margin-top: 4px;">
              用户： {{ gift.user }}赠送了：￥{{ gift.gift }}&nbsp;&nbsp;价值的礼物
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 弹幕开始 */

/* 弹幕装填 */
.danmu-waiting {
  color: orange;
  position: absolute;
  left: 100%;
  white-space: nowrap;
}

/* 弹幕完成 */
.danmu-done {
  color: orange;
  position: absolute;
  left: 0px;
  transform: translate3d(-100%, 0, 0);
}

/* 运动中 */
@keyframes running-1 {
  0% {
    left: 100%;
    top: 5%;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  100% {
    left: 0px;
    top: 5%;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes running-2 {
  0% {
    left: 100%;
    top: 10%;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  100% {
    left: 0px;
    top: 10%;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes running-3 {
  0% {
    left: 100%;
    top: 15%;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  100% {
    left: 0px;
    top: 15%;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes running-4 {
  0% {
    left: 100%;
    top: 20%;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  100% {
    left: 0px;
    top: 20%;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes running-5 {
  0% {
    left: 100%;
    top: 25%;
    white-space: nowrap;
    transform: translate3d(0, 0, 0);
  }

  100% {
    left: 0px;
    top: 25%;
    transform: translate3d(-100%, 0, 0);
  }
}

.danmu-running-1 {
  color: orange;
  position: absolute;
  animation: running-1 5s linear forwards;
}

.danmu-running-2 {
  color: orange;
  position: absolute;
  animation: running-2 5s linear forwards;
}

.danmu-running-3 {
  color: orange;
  position: absolute;
  animation: running-3 5s linear forwards;
}

.danmu-running-4 {
  color: orange;
  position: absolute;
  animation: running-4 5s linear forwards;
}

.danmu-running-5 {
  color: orange;
  position: absolute;
  animation: running-5 5s linear forwards;
}

/* 礼物弹幕 */
.danmu-running-1.is-gift {
  color: red;
}

.danmu-running-2.is-gift {
  color: red;
}

.danmu-running-3.is-gift {
  color: red;
}

.danmu-running-4.is-gift {
  color: red;
}

.danmu-running-5.is-gift {
  color: red;
}

.gift-message {
  color: red;
}

/* 弹幕结束 */
/*全局样式*/
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  text-decoration: none;
}

/* 头像开始 */
.head1 {
  height: 62px;
  width: 75%;
}

.head1 a {
  color: black;
}

.left {
  float: left;
  width: 50%;
}

.right {
  float: left;
  width: 50%;
  text-align: right;
}

.right div {
  height: 100%;
  font-size: 18px;
}

.right div a:hover {
  color: orange;
}

/* 头像结束 */

/* 视频开始 */
.video {
  height: 800px;
  width: 75%;
  background-color: black;
  position: relative;
}

/* 视频结束 */

/* 评论区开始 */
.right-head1 {
  height: 800px;
  width: 420px;
  position: absolute;
  left: 1432px;
  top: 162px;
}

.right-head1 .head2 {
  width: 100%;
}

.right-head1 .head2 span {
  border: 1px solid ghostwhite;
  background-color: ghostwhite;
  text-align: center;
  display: inline-block;
  width: 100%;
  line-height: 62px;
}

.right-head1 .head2 span:hover {
  background-color: white;
}

/*评论区和礼物榜的切换*/
.right-head1 .content {
  max-height: 704px;
  overflow-y: auto;
  width: 418px;
  height: 704px;
  background-color: white;
  margin-left: 0px;
  margin-top: 0px;
}

.right-head1 .fasong {
  border-top: 1px solid gainsboro;
}

.comment-area {
  padding: 10px;
  border: 1px solid #ddd;
  height: 600px;
  overflow-y: auto;
}

.comment {
  padding: 5px;
  border-bottom: 1px solid #eee;
}

/* 礼物榜开始 */
.gift-list {
  padding: 10px;
  border: 1px solid #ddd;
  height: 600px;
  overflow-y: auto;
}

.gift {
  padding: 5px;
  border-bottom: 1px solid #eee;
}

/* 礼物榜结束 */
/* 礼物表详情开始 */
.liwubiao {
  width: 75%;
  padding-top: 20px;
  height: 80px;
  text-align: right;
}

.liwubiao ul {
  list-style: none;
}

.liwubiao ul li {
  float: left;
  margin-right: 10px;
  color: orange;
}

.liwubiao ul li p {
  color: orange;
}

.liwubiao .jinbi {
  color: orange;
}

/* 礼物表详情结束 */
/* 底部  */
.footer {
  background-color: #333;
  padding: 20px;
  text-align: center;
  color: white;
  /* 添加这一行来设置底部字体为白色 */
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
  color: white;
  /* 确保链接分组标题颜色为白色 */
}

.link-group ul {
  list-style: none;
  padding: 0;
}

.link-group li {
  margin: 5px 0;
  color: rgba(255, 255, 255, 0.828);
  /* 确保列表项颜色为白色 */
}

.qr-code {
  margin: 20px 0;
}

.footer-info {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.716);
  /* 添加这一行来设置底部信息字体颜色为白色 */
}
</style>
