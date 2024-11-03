<!-- eslint-disable vue/multi-word-component-names -->
<template>

  <!-- <div>
    <router-view />
  </div> -->


  <div class="background">
    <el-carousel :interval="4000" type="card" class="carousel" height="300px">
      <el-carousel-item v-for="index in images.length" :key="index">
        <img :src="images[index - 1]" alt="Image {{ index }}" />
      </el-carousel-item>
    </el-carousel>

  </div>
  <div class="center">
    <h2 style="padding-top: 20px;padding-left: 50px;padding-bottom: 20px">热门直播</h2>
    <el-row>
      <!-- <el-col :span="5" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 1 : 1" style="margin-bottom: 30px;"> -->
        <div style="display: flex;flex-wrap: wrap;">
          <div style="height: 200px; width: 300px; margin: 20px 50px" v-for="(ele,idx) in auchorList">
              <a :href="'/show?tKey='+ele.tKey+'&account='+ele.account+'&img='+ele.img"     style="text-decoration: none;">
              <el-card :body-style="{ padding: '0px'}">
                <el-image :src="ele.coverName" :fit="contain" style="height: 100px;width: 300px;"  ></el-image>
                <el-row style="padding: 14px;">
                  <el-col class="touxiang" :span="6">
                    <el-avatar :src="ele.img" />
                  </el-col>
                  <el-col :span="18">
                    <span>{{ ele.title }}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ ele.describe }}</time>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </a>
          </div>
          
      </div>
      <!-- </el-col> -->
    </el-row>
    
  </div>
  <div class="backgroundtwo">
    <div class="flex flex-wrap gap-4" style="margin-left: 50px;">
      <el-card style="width: 200px" shadow="always">
        <el-col class="touxiang" :span="7">
          <span style="width: 100px;"><el-avatar src="/image1.jpg" class="image" /></span>
        </el-col>

        <el-col :span="30">
          <div class="zhubo"><span>好吃的汉堡</span><br></div>
          <span style="font-size: 13px; color: grey;">一个励志玩遍所有游戏的主播</span>
        </el-col>
      </el-card>
    </div>
    <div class="flex flex-wrap gap-4" style="margin-left: 50px;">
      <el-card style="width: 200px" shadow="always">
        <el-col class="touxiang" :span="7">
          <span style="width: 100px;"><el-avatar src="/image1.jpg" /></span>
        </el-col>
        <el-col :span="30">
          <div class="zhubo"><span>好吃的汉堡</span><br></div>
          <span style="font-size: 13px; color: grey;">一个励志玩遍所有游戏的主播</span>
        </el-col>
      </el-card>
    </div>
    <div class="flex flex-wrap gap-4" style="margin-left: 50px;">
      <el-card style="width: 200px" shadow="always">
        <el-col class="touxiang" :span="7">
          <span style="width: 100px;"><el-avatar src="/image1.jpg" /></span>
        </el-col>
        <el-col :span="30">
          <div class="zhubo"><span>好吃的汉堡</span><br></div>
          <span style="font-size: 13px; color: grey;">一个励志玩遍所有游戏的主播</span>
        </el-col>
      </el-card>
    </div>
    <div class="flex flex-wrap gap-4" style="margin-left: 50px;">
      <el-card style="width: 200px" shadow="always">
        <el-col class="touxiang" :span="7">
          <span style="width: 100px;"><el-avatar src="/image1.jpg" /></span>
        </el-col>
        <el-col :span="30">
          <div class="zhubo"><span>好吃的汉堡</span><br></div>
          <span style="font-size: 13px; color: grey;">一个励志玩遍所有游戏的主播</span>
        </el-col>
      </el-card>
    </div>
    <div class="flex flex-wrap gap-4" style="margin-left: 50px;">
      <el-card style="width: 200px" shadow="always">
        <el-col class="touxiang" :span="7">
          <span style="width: 100px;"><el-avatar src="/image1.jpg" /></span>
        </el-col>
        <el-col :span="30">
          <div class="zhubo"><span>好吃的汉堡</span><br></div>
          <span style="font-size: 13px; color: grey;">一个励志玩遍所有游戏的主播</span>
        </el-col>
      </el-card>
    </div>
  </div>
  <div class="center">
    <h2 style="padding-top: 20px;padding-left: 50px;padding-bottom: 20px">热门视频</h2>
    <el-row>
      <el-col :span="5" v-for="(o, index) in 12" :key="o" :offset="index > 0 ? 1 : 1" style="margin-bottom: 30px;">
        <a href="" style="text-decoration: none;">
          <el-card :body-style="{ padding: '0px' }">
            <img src="/image1.jpg" class="image">
            <el-row style="padding: 14px;">
              <el-col class="touxiang" :span="6">
                <el-avatar src="/image1.jpg" />
              </el-col>
              <el-col :span="18">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ time }}</time>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </a>
      </el-col>
    </el-row>
  </div>

</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
const {proxy}=getCurrentInstance()
let auchorList=reactive([])
const images = [
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg',
  '/image4.jpg',
  '/image5.jpg',
  '/image6.jpg',
]
const bgd="背景图"
  onMounted(()=>{
    let auchor=reactive({
      account:"",
      title:"",
      coverName:"",
      describe:"",
      tKey:"",
      statu:"",
      img:""
    })
    proxy.$http({
      url:"/show/index",
      method:"get"
    }).then(response=>{
      let data =response.data
      let keys =Object.keys(data)
      for(let i=0;i<keys.length;i++){
        let vl=data[keys[i]]
        auchor.account=keys[i]
        auchor.title=vl.title
        auchor.statu=vl.title
        
        auchor.coverName="http://localhost:8080/cover/"+vl.coverName
        
        auchor.describe=vl.describe
        auchor.tKey=vl.tKey
          proxy.$http({
            url:"/show/getImgUrl",
            params:{
              "account":auchor.account
            }
          }).then(response=>{
            auchor.img=response.data
            auchorList.push(auchor)
        }
        )
        
      }
   
      
      
    })
  })
</script>



<style scoped>
* {
  padding: 0px;
  margin: 0px;
  /* height: 100%; */
  overflow: hidden;
}

.touxiang {
  height: 40px;
  width: 40px;
}


.background {
  background-image: url('/background.jpg');
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 使背景图覆盖整个容器 */
  background-position: center;
  /* 居中显示背景图 */
  height: 65vh;
  /* 高度为视口高度 */
  width: 100%;
  /* 宽度为100% */
  display: flex;
  /* 使用 flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */

}

.backgroundtwo {
  background-image: url('/background3.png');
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 使背景图覆盖整个容器 */
  background-position: center;
  /* 居中显示背景图 */
  height: 45vh;
  /* 高度为视口高度 */
  width: 100%;
  /* 宽度为100% */

  display: flex;
  /* 使用 flexbox 布局 */
  justify-content: center;
  /* 水平居中 */
  align-items: center;
  /* 垂直居中 */
  margin-top: 50px;
  margin-bottom: 50px;

}

.el-carousel__item img {
  width: 100%;
  /* 确保图片占满整个轮播项 */
  height: auto;
  /* 高度自动，保持比例 */
}

.carousel {
  margin-top: -5%;
  width: 85%;
  /* 轮播的宽度设置为 80% 或其他合适的值 */
}

.center {
  width: 80%;
  margin: auto;

}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.example-pagination-block+.example-pagination-block {
  margin-top: 10px;
}

.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.zhubo {
  text-align: center;
}
</style>