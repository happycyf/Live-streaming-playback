<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="center">
        <h2 style="padding-top: 20px;padding-left: 50px;padding-bottom: 20px">直播推荐</h2>
        <el-row>
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
        </el-row>
    </div>
</template>

<script setup >
import { onMounted,getCurrentInstance,reactive } from 'vue';
const {proxy}=getCurrentInstance()
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
padding: 0px;
margin: 0px;
/* height: 100%; */
overflow: hidden;
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
}</style>