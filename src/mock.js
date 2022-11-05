window.WegameLogin = {
  default:{
    isLogin(){
      return true;
    },
    getUserInfo(){
      return {
        "tgp_id": "000000",
        "faceurl": "https://shp.qpic.cn/wg_hpic/0/avatar_1512536682343/0",
        "nick": "test",
        "channel": "qq"
      }
    },
    async getLoginUser(){
      return {
        "tgpid": 0,
        "biz_refresh_time": 3000,
        "biz_valid_time": 7200,
        "showid": 0,
        "personal_home_region": "CN",
        "agent_client_type": 1,
        "client_type": 1000005,
        "version": 20180723,
        "accounttype": 0,
        "reallevel": 0,
        "uin": 2817263026
    }
    }
  }
}