<template>
  <div class="battleDetail" v-if="ready">
    <div 
      v-for="team of filteredTeams" :key="team.teamId"
      class="team" :class="team.win"
    >
      <div class="teamInfo">
        <div class="block teamName" style="min-width: 236px;">
          <div class="teamStateInfo">
            <div class="state" :class="team.win">
              {{team.win === 'Win' ? "胜利" : "失败"}}
            </div>
            <div class="name">
              ({{team.teamId === '100' ? "蓝方" : "红方"}})
            </div>
          </div>

        </div>
        <div class="space flex-auto"></div>


        <div class="block eloInfo">
          <div class="ELO" title="ELO评分">
            {{team.teamElo}}
          </div>
        </div>

      </div>
      <battleDetailPlayer
        v-for="player of team.player_details"
        class="player" :class="{
          highlight: player.openid === openid
        }"
        :key="player.openid"
        :data="player"
        :totalData="battleDetail.player_details"
        @clickSummon="handleClickSummon"
      >
      </battleDetailPlayer>
    </div>
  </div>
</template>

<script>
import rq from "../utils/request"
import userInfoMixin from "../mixins/userInfo.mixin"
import icons from "./icons.vue"
import battleDetailPlayer from "./battleDetailPlayer.vue"

export default {
  mixins:[
    userInfoMixin
  ],
  props:[
    "gameId",
  ],
  components:{
    battleDetailPlayer
  },
  watch:{
    gameId(){
      this.getBattleDetail();
    }
  },
  data(){
    return {
      ready: false,
      openid:null,
      battleDetail: null
    }
  },
  computed:{
    filteredTeams(){
      return this.battleDetail.team_details.map(item=>{
        return {
          ...item,
          player_details: this.battleDetail.player_details.filter(p=>p.teamId === item.teamId).sort((a,b)=>b.teamMadeSize - a.teamMadeSize)
        }
      })
    }
  },
  async mounted(){
    await Promise.all([
      this.getBattleDetail(),
    ]);
    this.ready = true;

  },
  methods:{
    async getBattleDetail(){
      let {openid, battle_detail} = await rq.GetBattleDetail({
        ...this.rqOptions,
        game_id: this.gameId
      });
      console.log(battle_detail);
      this.openid = openid;
      this.battleDetail = battle_detail;
    },
    handleClickSummon({openid}){
      this.$router.push({ name: 'summary', params: {
        area: this.area,
        accountType: 2,
        id: openid
      }});
    }
  }
  
}
</script>

<style lang="less" scoped>
  .battleDetail{
    display:flex;
    flex-direction: column;
    .team{
      .teamInfo{
        height:40px;
        padding:5px;
        font-size:16px;
        display:flex;
        flex-direction: row;
        align-items: center;
        background-color:rgba(0,0,0,0.15);
        .teamName{
          display:flex;
          flex-direction: column;
          .teamStateInfo{
            display:flex;
            flex-direction: row;
            .state{
              font-weight: bold;
              &.Win{
                color:#5383e8
              }
              &.Fail{
                color:#e84057
              }

            }
            .name{
              margin-left: 5px;
              color:#999;
            }
          }
        }
        
        .eloInfo{
            .ELO{
              color:#999;
              cursor:default;
              font-weight: bold;
              font-family:Verdana, Geneva, Tahoma, sans-serif;
            }
          }
      }
      &.Win{
        background-color: #28344e;
        .player{
          &:hover, &.highlight{
            background-color: #2f436e
          }
        }
      }
      &.Fail{
        background-color: #59343b;
        .player{
          &:hover, &.highlight{
            background-color: #703c47
          }
        }
      }
      .player{
        padding:5px 5px;
      }
    }
  }
  
</style>