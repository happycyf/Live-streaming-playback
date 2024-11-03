<!-- eslint-disable vue/multi-word-component-names -->
<template>  
   <div class="center">  
        <div class="header-container">  
            <h2 class="title">查账</h2>  
            <div class="search-container">  
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">  
                    <path  
                        d="M10.5 2C5.81 2 2 5.81 2 10.5S5.81 19 10.5 19c2.21 0 4.21-.79 5.75-2.09l4.39 4.39 1.41-1.41-4.39-4.39C18.21 14.71 19 12.71 19 10.5 19 5.81 15.19 2 10.5 2zm0 3c3.95 0 7 3.05 7 7s-3.05 7-7 7-7-3.05-7-7 3.05-7 7-7z" />  
                </svg>  
                <input type="text" class="search-input" placeholder="请输入内容..." v-model="searchQuery" />  
            </div>  
        </div>  

        <!-- 将全站总额与按钮放入同一行 -->  
        <div class="sum-and-buttons mb-4">  
            <div class="sum">  
                <span>全站总额（元）：{{ totalAmount }}</span>  
            </div>  
            <!-- <div class="buttons">  
                <el-button type="success" plain>同意</el-button>  
                <el-button type="danger" plain>驳回</el-button>  
            </div>   -->
        </div>  

        <div class="table-container">  
            <el-table :data="filteredTableData" style="width: 100%">  
                <!-- <el-table-column type="selection" width="55" />   -->
                <el-table-column property="id" label="序号" width="150" sortable />  
                <el-table-column property="name" label="名字" width="200" />  
                <el-table-column property="money" label="金额" width="200" />  
                <el-table-column label="日期" width="200">  
                    <template #default="scope">{{ scope.row.date }}</template>  
                </el-table-column>  
                <el-table-column property="status" label="状态" width="200" />  
                <el-table-column fixed="right" label="操作" min-width="100">  
                    <template #default="scope">  
                        <el-button link type="primary" size="small" @click="handleClick(scope.row)">  
                            同意  
                        </el-button>  
                        <el-button link type="primary" size="small" @click="handleReject(scope.row)">  
                            驳回  
                        </el-button>  
                    </template>  
                </el-table-column>  
            </el-table>  
        </div>  
    </div>  
</template>  

<script setup lang="ts">  
import { computed, ref,getCurrentInstance, onMounted, reactive } from 'vue'  
import { ElTable } from 'element-plus'  
let { proxy } = getCurrentInstance()
const currentDate = new Date()  
const time = currentDate.toLocaleString()  
console.log(time)  

proxy.$http({
    url:"/with/findAll"
}).then(response=>{
    
    
    let data=response.data.data
    for(let i=0;i<data.length;i++){
        let item=data[i]
        let state=null;
        switch(item.state){
            case 0:
                state="在申请"
                break;
            case 1:
                state="已通过"
                break;
            case 2:
                state="已驳回"
                break;
        }
        tableData.push({
            id:item.id,
            name:item.name,
            money:item.money,
            date:item.data,
            status:state+""
        })
    }
    
})
interface User {  
    id: number  
    name: string  
    money: string  
    date: string  
    status: string  
}  

const tableData: User[] = reactive([ ])

const searchQuery = ref('')  

const filteredTableData = computed(() => {  
    return tableData.filter(item =>  
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase())  
    )  
})

const totalAmount = computed(() => {  
    return filteredTableData.value.reduce((acc, item) => acc + parseFloat(item.money), 0).toFixed(2);  
})

const handleClick = (row: User) => {  
    proxy.$http({
        url:"/with/upState",
        params:{
            id:row.id,
            state:1
        }
    }).then(response=>{
        for(let i=0;i<tableData.length;i++){
            if(tableData[i].id==row.id){
                tableData[i].status="已通过"
            }
        }
    })
}  

const handleReject = (row: User) => {  
    proxy.$http({
        url:"/with/upState",
        params:{
            id:row.id,
            state:1
        }
    }).then(response=>{
        for(let i=0;i<tableData.length;i++){
            if(tableData[i].id==row.id){
                tableData[i].status="已驳回"
            }
        }
    })
}  
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
}  

.header-container {  
    display: flex;  
    align-items: center;  
    justify-content: space-between;  
    padding: 20px 0;  
}  

.title {  
    margin: 0;  
    padding-left: 50px;  
}  

.search-container {  
    position: relative;  
    display: flex;  
    align-items: center;  
    margin-right: 50px;  
}  

.search-input {  
    padding: 10px 45px;  
    border: 1px solid #ccc;  
    border-radius: 4px;  
    outline: none;  
    padding-left: 35px; /* 调整输入框的内边距 */  
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

.sum-and-buttons {  
    display: flex;  
    align-items: center; /* 垂直居中对齐 */  
    justify-content: space-between; /* 可选，空间均匀分配 */  
    margin-top: 30px; /* 调整与上面内容间的间距 */  
}  

.sum {  
    flex-grow: 1; /* 允许总额部分灵活增长 */  
}  

.buttons {  
    display: flex;  
    gap: 10px; /* 按钮之间的间距 */  
}  

.table-container {  
    margin-top: 30px; /* 调整为适合的间距 */  
    margin-bottom: 500px;  
}  
</style>