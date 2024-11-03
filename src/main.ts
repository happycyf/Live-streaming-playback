// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Login from '@/components/views/login.vue'
import Zhuce from '@/components/views/zhuce.vue'
import Loginadmin from '@/components/views/loginadmin.vue'
import Loginshouji from '@/components/views/loginshouji.vue'
import Show from '@/components/views/show.vue'
import Index from '@/components/views/index.vue'
import Live from '@/components/views/live.vue'
import Video from '@/components/views/video.vue'
import LeftMenu from '@/pages/personalCentre/leftMenuPage.vue'
import Attention from '@/pages/personalCentre/attentionPage.vue'
import Personal from '@/pages/personalCentre/personalCenterPage.vue'
import History from '@/pages/personalCentre/historyPage.vue'
import Message from '@/pages/personalCentre/messagePage.vue'
import Chat from '@/pages/personalCentre/chatPage.vue'
import Lately from '@/pages/personalCentre/latelyPage.vue'
import Friend from '@/pages/personalCentre/friendPage.vue'
import PersonalIndex from '@/components/views/personalIndex.vue'
import Search from '@/components/views/SearchTheRoom.vue'
import Check from '@/components/views/checkmoney.vue'
import {createPinia} from 'pinia'
import Chongzhi from '@/components/views/chongzhi.vue' 
import VueAxios from 'vue-axios'
import ChaRoom from '@/components/views/chaRoom.vue'
//引入路由
import {createRouter,createWebHistory} from 'vue-router'
//引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入样式
import 'element-plus/dist/index.css'
import  ElementPlus  from 'element-plus'
//引入隐藏元素
import 'element-plus/theme-chalk/display.css'
import axios from 'axios'
//路由配置
const routes = [
  { path: '/show', component:Show},
   { path: '/zhuce', components:{
    default:Index,
    login:Zhuce,
    }},
   { path: '/login', components:{
    default:Index,
    login:Login, 
    },
    children:[
      {path:'admin',component:Loginadmin},
      {path:'',component:Loginadmin},
      {path:'shouji',component:Loginshouji},
    ]
   },
  { path: '/chongzhi', component:Chongzhi},
  {path:"", component:Index},
  {path:"/index", component:Index},
  {path:"/live", component:Live},
  {path:"/video", component:Video},

  
  { path: '/personalIndex', component:PersonalIndex,
    children:[
         // 默认页面
   {path:"", components:{
    default:LeftMenu,
    body:Personal
}},
//个人中心页面
{path:"/psl", components:{
    default:LeftMenu,
    body:Personal
}},
//关注页面
{path:"/att", components:{
    default:LeftMenu,
    body:Attention
}},
//历史记录页面
{path:"/hty", components:{
    default:LeftMenu,
    body:History
}},
//我的消息页面
{path:"/msg", components:{
    default:LeftMenu,
    body:Message
},
    children:[
        {path:"", components:{
            people:Lately,
        }},
        {path:"lately",components:{
            people:Lately,
        }},
        {path:"friend", components:{
            people:Friend,
        }},
        {path:"chat", components:{
            default:Chat,
            people:Lately,
            }
        },
    ]
},
    ]
  },
  {path:"/ChaRoom", component:ChaRoom},
  { path: '/searchTheRoom', component: Search},
  {path:"/checkmoney", component:Check},
]
//创建路由
const router = createRouter({
  history: createWebHistory(),//路由工作模式
  routes,
})
//加载路由
const app =createApp(App)
app.use(router)
//加载element
app.use(ElementPlus)
//引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) { 
    app.component(key, component)
  }
  
    // 设置 axios 的请求根路径
    axios.defaults.baseURL = 'http://127.0.0.1:8080'
    axios.defaults.withCredentials = true; 
    // 将 axios 挂载为 app 的全局自定义属性
    // 每个组件可以通过 this 直接访问到全局挂载的自定义属性
    app.config.globalProperties.$http = axios
    
  const pinia = createPinia()
  app.use(pinia)
  app.use(VueAxios, axios)



  
app.mount('#app')
