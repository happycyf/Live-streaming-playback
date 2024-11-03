import {defineStore} from 'pinia';

export const userStore = defineStore('userStore', {
  state: () => {
    return {
        uId: 0,
        uName:'',
        account:'',
        pwd:'',
        img:'',
        attention:0,
        fan:0,
        blance:0,
        phone:'',
        sex:'',
        adress:'',
        uTypeId:0,
        tKey:''
    };
  },
  getters: {
    getName: (state) => state.uName,
  },
  actions: {
    setUser(user: any){
      this.uId = user.uid;
      this.uName = user.uname;
      this.account = user.account;
      this.pwd = user.pwd;
      this.img = user.img;
      this.attention = user.attention;
      this.fan = user.fan;
      this.blance = user.blance;
      this.phone = user.phone;
      this.sex = user.sex;
      this.adress = user.adress;
      this.uTypeId = user.utypeId;
      this.tKey = user.tkey;
      
    },
    setUId(uId: number) {
      this.uId = uId;
    },
    setUName(uName: string) {
      this.uName = uName;
    },
    setSex(sex: string) {
      this.sex = sex;
    },
    setAdress(adress: string) {
      this.adress = adress;
    },
    setAccount(account: string) {
      this.account = account;
    },
    setPwd(pwd: string) {
      this.pwd = pwd;
    },
    setImg(img: string) {
      this.img = img;
    },
    setAttention(attention: number) {
      this.attention = attention;
    },
    setFan(fan: number) {
      this.fan = fan;
    },
    setBalance(blance: number) {
      this.blance = blance;
    },
    setPhone(phone: string) {
      this.phone = phone
    },
    setUTypeId(uTypeId: number) {
      this.uTypeId = uTypeId;
    },
    setTKey(tKey: string) {
      this.tKey = tKey;
    },
    
  },
});