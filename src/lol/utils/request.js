const simpleInterface = [
  "SearchPlayer",
  "GetSummonerInfo",
  "GetBattleList",
  "GetBattleDetail"
]
export default new class{
  constructor(){
    this.basePath = "/api/v1/wegame.pallas.game.LolBattle";

    // 自动生成函数
    simpleInterface.forEach(func=>{
      this[func] = async _=> this.request(func, _);
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
    return await res.json()
  }
  
}