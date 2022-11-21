<template>
  <div class="battleListItem" :class="winState">
    
    <div class="icon">
      <icons class="img" type="champions" :id="data.champion_id"></icons>
      <div class="badge mvp" v-if="data.was_mvp">MVP</div>
      <div class="badge svp" v-if="data.was_svp">SVP</div>
    </div>
    <div class="state">
      <div class="title">
        <span class="result" :class="winState">{{winState}}</span>
        <span class="type" >({{type}})</span>
      </div>
      <div class="duration" title="游戏时间">
        {{data.game_time_played | time}}
      </div>
      <div class="time" title="对局开始时间">
        {{data.game_start_time | date}}
      </div>
    </div>

    <!-- <div class="score">
      <div class="point" title="得分">
        {{data.game_score | gameScore}}
      </div>
      <div class="kda">
        <span class="item kill" title="kills">{{data.kills}}</span> /
        <span class="item death" title="deaths">{{data.deaths}}</span> /
        <span class="item assist" title="assists">{{data.assists}}</span>
      </div>
    </div>

    <div class="tags">
      <div class="tag-item" 
        v-for="item of tags"
        :key="item"
      >
        {{item}}
      </div>
    </div> -->
  </div>
</template>

<script>
import icons from "./icons.vue"
import filters from "../mixins/filter.mixin"
import { winTypes, battleModes, getJudgeMent, teamMadeMap} from "../const/types"
export default {
  props:[
    "data"
  ],
  mixins:[filters],
  components:{
    icons
  },
  computed:{
    winState(){
      if(this.data.was_early_surrender){
        return "重开"
      }else{
        return winTypes[this.data.win]
      }
    },
    judgement(){
      let [tag] = getJudgeMent(this.data.battle_type);
      return tag;
    },
    type(){
      return battleModes[this.data.game_queue_id] || `未知`;
    },
    tags(){
      const t = [];
      const data = this.data;
      if(this.judgement){
        t.push(this.judgement);
      }
      if(data.win_with_less_teammate){
        t_push("以少胜多")
      }
      if(data.was_surrender){
        t.push("投降");
      }
      if(data.was_afk){
        t.push("逃跑");
      }
      if(data.penta_kills){
        t.push("五杀");
      }else if(data.quadra_kills){
        t.push("四杀");
      }else if(data.triple_kills){
        t.push("三杀");
      }
      // 双杀不配
      // else if(data.double_kills){
      //   t.push("双杀");
      // }
      t.push(teamMadeMap[data.team_made_size]);
      return t.slice(0,4);
    }
  },
}
</script>

<style lang="less" scoped>
  .space{
    flex:auto;
  }
  .battleListItem{
    height:60px;
    display:flex;
    flex:none;
    padding:5px;
    flex-direction: row;
    .icon{
      height:60px;
      position: relative;
      .img{
        height: 60px;
        width: 60px;
        object-fit: contain;
      }
      .badge{
        position: absolute;
        right:0px;
        bottom:0px;
        color:#000;
        font-size:12px;
        font-family: Consolas, Monaco, monospace;
        padding:0 3px;
        user-select: none;
        font-weight: bold;
        border-radius: 2px;
        transform: scale(0.9);
      }
      .mvp{
        background-color:#f5e124;
      }
      .svp{
        background-color:#eeeeee;

      }
    }
    .state{
      width:200px;
      flex:none;
      margin-left:10px;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        font-size:16px;
        .result{
          font-weight: bold;
          &.胜利{
            color:#09a95b;
          }
          &.失败{
            color:#db4c4c;
          }
          &.重开{
            color:#ddd;
          }
        }
        .type{
          font-size:14px;
          margin:0 5px;
        }
      }
      .duration{
        font-size:12px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }
      .time{
        font-size:12px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }

    }
    .score{
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      flex:none;
      width:120px;
      .point{
        color:#b59758;
        font-weight: bold;
        font-size:20px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }
      .kda{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 14px;
        color:#aaa;
        .item{
          display:inline-block;
        }
      }
    }
    
    .tags{
      margin-left:50px;
      min-width:200px;
      display:flex;
      flex:auto;
      flex-wrap: wrap;
      align-items: center;
      .tag-item{
        background-color:#39437a;
        padding:3px 15px;
        margin-right:8px;
        display:inline-block;
        color:white;
        font-weight: bold;
        height:20px;
        font-size:14px;
        border-radius: 20px;
      }
    }
  }
  
</style>