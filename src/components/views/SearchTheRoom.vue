<template>  
   <div class="center">  
        <div class="header-container">  
            <h2 class="title">查房</h2>  
            <div class="search-container">  
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">  
                    <path  
                        d="M10.5 2C5.81 2 2 5.81 2 10.5S5.81 19 10.5 19c2.21 0 4.21-.79 5.75-2.09l4.39 4.39 1.41-1.41-4.39-4.39C18.21 14.71 19 12.71 19 10.5 19 5.81 15.19 2 10.5 2zm0 3c3.95 0 7 3.05 7 7s-3.05 7-7 7-7-3.05-7-7 3.05-7 7-7z" />  
                </svg>  
                <!-- <input type="text" class="search-input" placeholder="请输入直播标题..." v-model="searchQuery" />   -->
            </div>  
        </div>  

        <el-row class="card-container">  
            <!-- <el-col :span="5" v-for="(card, index) in filteredCards" :key="index" :offset="index > 0 ? 1 : 1" style="margin-bottom: 30px;">  
                <a href="" style="text-decoration: none;">  
                    <el-card :body-style="{ padding: '0px' }">  
                        <img src="/image1.jpg" class="image">  
                        <el-row style="padding: 14px;">  
                            <el-col class="touxiang" :span="6">  
                                <el-avatar src="/image1.jpg" />  
                            </el-col>  
                            <el-col :span="18">  
                                <span>{{ card.title }}</span>  
                                <div class="bottom clearfix">  
                                    <time class="time">{{ time }}</time>  
                                </div>  
                                <div class="mb-4" style="margin-left: 25px; padding-top: 10px;">  
                                    <el-button type="danger" plain >封禁</el-button>  
                                </div>  
                            </el-col>  
                        </el-row>  
                    </el-card>  
                </a>  
            </el-col>   -->
            <el-row>
                    <div style="display: flex;flex-wrap: wrap;">
                <div style="height: 200px; width: 300px; margin: 20px 50px" v-for="(ele,idx) in auchorList">
                    <RouterLink :to="'/ChaRoom?tKey='+ele.tKey+'&account='+ele.account+'&img='+ele.img"     style="text-decoration: none;">
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
                    </RouterLink>
                </div>
                
            </div>
        </el-row>
            <div v-if="!auchorList.length" class="no-results">  
                没有找到相关结果  
            </div>  
        </el-row>  
    </div>  
</template>  

<script setup >  
import { getCurrentInstance, ref, reactive,onMounted} from 'vue'  
import { RouterLink } from 'vue-router';
let {proxy} =getCurrentInstance()
let auchorList=reactive([])
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
    margin: 0;  
    padding: 0;  
    overflow: hidden;  
    box-sizing: border-box;  
    text-decoration: none;  
}  

.center {  
    width: 80%;  
    margin: auto;  
    margin-bottom: 400px;  
}  

.header-container {  
    display: flex;  
    align-items: center; /* 垂直居中对齐 */  
    justify-content: space-between; /* 在水平上均匀分布 */  
    padding: 20px 0; /* 设置上下内边距 */  
}  

.title {  
    margin: 0; /* 移除默认的外边距 */  
    padding-left: 50px; /* 添加左侧内边距 */  
}  

.search-container {  
    position: relative;  
    display: flex;  
    align-items: center; /* 垂直居中对齐 */  
    margin-right: 50px; /* 添加右侧内边距 */  
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

.time {  
    font-size: 13px;  
    color: #999;  
}  

.bottom {  
    margin-top: 13px;  
    line-height: 10px;  
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
    clear: both;  
}  

.card-container {  
    min-height: 300px; /* 设置最小高度 */  
}  

.no-results {  
    text-align: center;  
    color: #999;  
    font-size: 16px;  
    margin-top: 100px; /* 调整提示信息的位置 */  
   
}  
</style>