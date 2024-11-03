// import {defineStore} from 'pinia';

// export const userStore = defineStore('userStore', {
//   state: () => {
//     return {
//         uId:1,
//         uName:'豆奶',
//         age:21,
//         sex:'男',
//         address:'湖南省永州市',
//         account:'2588785',
//         pwd:'123456',
//         img:'/陆小果.jpg',
//         attention:2,
//         fan:15,
//         balance:100,
//         phone:15356087121,
//         uTypeId:2,
//     };
//   },
//   getters: {
//     getName: (state) => state.uName,
//   },
//   actions: {
//     setUser(user: any){
//       this.uId = user.uid;
//       this.uName = user.uname;
//       this.age = user.age;
//       this.sex = user.sex;
//       this.address = user.address;
//       this.account = user.account;
//       this.pwd = user.pwd;
//       this.img = user.img;
//       this.attention = user.attention;
//       this.fan = user.fan;
//       this.balance = user.balance;
//       this.phone = user.phone;
//       this.uTypeId = user.utypeId;
      
//     },

//     setUId(uId: number) {
//       this.uId = uId;
//     },
//     setUName(uName: string) {
//       this.uName = uName;
//     },
//     setAge(age: number) {
//       this.age = age;
//     },
//     setSex(sex: string) {
//       this.sex = sex;
//     },
//     setAddress(address: string) {
//       this.address = address;
//     },
//     setAccount(account: string) {
//       this.account = account;
//     },
//     setPwd(pwd: string) {
//       this.pwd = pwd;
//     },
//     setImg(img: string) {
//       this.img = img;
//     },
//     setAttention(attention: number) {
//       this.attention = attention;
//     },
//     setFan(fan: number) {
//       this.fan = fan;
//     },
//     setBalance(balance: number) {
//       this.balance = balance;
//     },
//     setPhone(phone: number) {
//       this.phone = phone;
//     },
//     setUTypeId(uTypeId: number) {
//       this.uTypeId = uTypeId;
//     },
    
//   },
// });