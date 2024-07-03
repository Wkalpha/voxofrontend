import Data from "../static/data/userDashboard.json";

export const useUserDashboardStore = defineStore({
  id: "UserDashboard",

  state: () => {
    return {
      data: Data.data,
      user:{}
    };
  },
  actions:{
    // setUser(payload){
    //   this.user = payload
    //   useCookie('user').value =JSON.stringify(payload)
      
    // },
    setUser(payload) {
      this.user = { ...this.user, ...payload };
      // 设置持久化 Cookie，有效期 7 天http://localhost:3000/?merchantIdNo=A123456789
      useCookie('user', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 天
      }).value = JSON.stringify(this.user);
    },
    logoutUser(){
      this.user = {}
      useCookie('user').value =undefined;
    }
  }
});
