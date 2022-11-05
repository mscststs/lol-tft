<template>
  <div class="summonerInfo" v-if="ready">
    <panel title="总览">
      <div class="user">
        <!-- 头像 -->
        <icons class="icon" type="usericon" :id="summonerInfo.icon_id"></icons>

        <!-- 基本信息 -->
        <div class="baseInfo">
          <!-- 召唤师名字 -->
          <div class="item name">{{summonerInfo.name}}</div>
          <div class="item">等级: {{summonerInfo.level}} 
            <span class="sub">
              ({{summonerInfo.experience}})
            </span>
          </div>
          <div class="item">
            赞: {{summonerInfo.praise}} | 黑: {{summonerInfo.discredit}}
          </div>
        </div>

        <div class="flex-space"></div>

        <!-- 对局信息 -->
        <div class="battleInfo">
          <div class="item">
            <span class="title">所有对局： </span>
            <span class="all">{{battleCount.total_games}}</span>
            / <span class="win">{{battleCount.total_wins}}</span>
            / <span class="lost">{{battleCount.total_losts}}</span>
          </div>
          
          <div class="item">
            <span class="title">大乱斗： </span>
            <span class="all">{{battleCount.total_arm_games}}</span>
            / <span class="win">{{battleCount.total_arm_wins}}</span>
            / <span class="lost">{{battleCount.total_arm_losts}}</span>
          </div>
          
          <div class="item">
            <span class="title">匹配： </span>
            <span class="all">{{battleCount.total_rank_games}}</span>
            / <span class="win">{{battleCount.total_rank_wins}}</span>
            / <span class="lost">{{battleCount.total_rank_losts}}</span>
          </div>

          <div class="item">
            <span class="title">排位： </span>
            <span class="all">{{battleCount.total_match_games}}</span>
            / <span class="win">{{battleCount.total_match_wins}}</span>
            / <span class="lost">{{battleCount.total_match_losts}}</span>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import rq from "../utils/request"
import userInfoMixin from "../mixins/userInfo.mixin"
import panel from "./view/panel.vue"
import icons from "./icons.vue"

export default {
  mixins:[
    userInfoMixin
  ],
  components:{
    panel,
    icons,
  },
  data(){
    return {
      ready:false,
      summonerInfo:null,
      battleCount:null,
    }
  },
  async mounted(){
    await Promise.all([
      this.getSummonerInfo(),
      this.getBattleReport()
    ]);
    this.ready = true;
  },
  methods:{
    async getSummonerInfo(){
      try{

        let {summoner} = await rq.GetSummonerInfo(this.rqOptions);
        this.summonerInfo = summoner;
      }catch(e){
        alert("请求用户数据出错，请检查区服")

      }
    },
    async getBattleReport(){
      let {battle_count} =await rq.GetBattleReport(this.rqOptions);
      this.battleCount = battle_count;
    }
  }
}
</script>


<style lang="less" scoped>
  .summonerInfo{
    min-width: 700px;
    .user{
      display:flex;
      flex-direction: row;
      height:120px;
      .icon{
        height:120px;
        width:120px;
        object-fit: contain;
      }
      .baseInfo{
        margin-left:12px;
        .item{
          font-size:14px;
          margin-bottom:15px;
          &.name{
            color:#b59758;
            font-weight: bold;
            font-size: 18px;
          }
          .sub{
            font-size:12px;
            opacity: 0.8;
          }
        }
      }
      .flex-space{
        flex:auto;
      }
      .battleInfo{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        min-width:350px;
        .item{
          font-size:14px;
          line-height: 20px;
          color:#666;
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          .title{
            display:inline-block;
            width:80px;
            color:#ddd;
            flex:none;
          }
          .all{
            color:#ddd;
            font-size: 16px;
            &:after{
              content:"(总)";
              font-size:12px;
              margin-left:2px;
            }
          }
          .win{
            color:rgb(9, 169, 91);
            font-size: 16px;
            &:after{
              content:"(胜)";
              font-size:12px;
              margin-left:2px;
            }
          }
          .lost{
            color:rgb(215, 117, 117);
            font-size: 16px;
            &:after{
              content:"(败)";
              font-size:12px;
              margin-left:2px;
            }

          }
        }
      }
    }
  }
</style>