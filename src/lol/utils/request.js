const simpleInterface = [
  "SearchPlayer",
  "GetSummonerInfo",
  "GetBattleReport",
  "GetBattleList",
  "GetBattleDetail"
]
export default new class{
  constructor(){
    this.basePath = "/api/v1/wegame.pallas.game.LolBattle";

    // 自动生成函数
    simpleInterface.forEach(func=>{
      this[func] = _=> this.request(func, _);
    })
  }

  async request(func, postData = {}){
    let res = await fetch(
      `${this.basePath}/${func}`,
      {
        method:"post",
        body:JSON.stringify(postData),
        headers:{
          "Content-Type": "application/json",
          "trpc-caller": "wegame.pallas.web.LolBattle"
        }
      }
    );
    res = await res.json()
    if(res && res.result && res.result.error_code){
      //发生错误
      throw new Error(`请求失败：${func} | `+res.result.error_message);
    }else{
      return res
    }
  }
  
}

const roleInfoCache = {};

/**
 * @description 获取角色信息
 * @param {*} roleId 
 */
export const getRoleInfo = async (roleId) => {
  if(!roleInfoCache[roleId]){
    const roleInfoReq = await fetch(`https://game.gtimg.cn/images/lol/act/img/js/hero/${roleId}.js`);
    const roleInfoRes = await roleInfoReq.json();
    roleInfoCache[roleId] = roleInfoRes;
  }
  return roleInfoCache[roleId];
}