<template>
    <el-button @click="close" type="danger">封禁</el-button>
    <br>
    <video controls ref="videoRef" style="height: 1200px;width: 100%;">
    </video>
</template>
<script setup>
import axios from 'axios';
import { ref,onMounted,getCurrentInstance } from 'vue';
import { useRoute } from 'vue-router'
let {proxy}=getCurrentInstance()
const route = useRoute()
const tKey = route.query.tKey
const account = route.query.account
let url = "http://47.96.151.142:1985/rtc/v1/whep/?app=live&stream=" + tKey + ""
let videoRef = ref()
let media = new MediaStream()
let pc = new RTCPeerConnection()
onMounted(
  async () => {
    // 赋予读取窗口
    videoRef.value.srcObject = media
    // 捕获视频和音频
    pc.addTransceiver("audio", { direction: "recvonly" })
    pc.addTransceiver("video", { direction: "recvonly" })
    // 创建信令
    var offer = await pc.createOffer()
    // 修改本地的offer
    await pc.setLocalDescription(offer)

    const answer = await new Promise((resolve, reject) => {
      console.log(`Generated offer: ${offer.sdp}`)
      // 交换信令sdp
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        if (xhr.readyState !== xhr.DONE) return
        if (xhr.status !== 200 && xhr.status !== 201) return reject(xhr)
        const data = xhr.responseText
        console.log("Got answer: ", data)
        // 返回服务器返回的aswer
        return data.code ? reject(xhr) : resolve(data)
      }
      xhr.open('POST', url, true)
      // 设置请求头为sdp
      xhr.setRequestHeader('Content-type', 'application/sdp')
      xhr.send(offer.sdp)
    })
    // 进行通讯建立
    await pc.setRemoteDescription(
      new RTCSessionDescription({ type: 'answer', sdp: answer }))
  })
  // 添加监听事件到midea存储

pc.ontrack = function (event) {
  media.addTrack(event.track)
}
const close = async () => {
  if (confirm("确定要封禁吗？")) {
    const xhr =new XMLHttpRequest()
    // 通过xhr发送请求进行服务器信息获取
    xhr.open('get', 'http://47.96.151.142:1985/api/v1/clients/', true)
    xhr.send()
    xhr.onload = function () {
      // 请求成功返回服务器给予的数据
        const data = JSON.parse(xhr.responseText)
        console.log(data);
        // 获取所有在线用户
        const body= data.clients
        
        
        
        for (let b in body) {
          // 通过索引遍历
            let bd=body[b]
            console.log(bd.type=="rtc-publish" && bd.name==tKey,"type=",bd.type,bd.name);
            // 判断当前用户是否是开播用户且当前用户的推流键是封禁主播的键
            if (bd.type=="rtc-publish" && bd.name==tKey) {
                const xhr2 = new XMLHttpRequest()
                // 发送封禁http 格式http://47.96.151.142:1985/api/v1/clients/' 推流端的id'?callback=angular.callbacks._4&method=DELETE
                xhr2.open('get', 'http://47.96.151.142:1985/api/v1/clients/'+bd.id+'?callback=angular.callbacks._4&method=DELETE', true)
                // 进行发送
                xhr2.send()
                // 给予关闭
                break;
            }
        }
        
    }
  }
}
</script>