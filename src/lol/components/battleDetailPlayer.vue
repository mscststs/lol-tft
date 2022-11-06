<template>
  <div class="battleDetailPlayer">
    <!-- 英雄 -->
    <div class="champion">
      <icons class="icon" type="champions" :id="data.championId"></icons>
      <div class="badge level">{{data.level}}</div>
    </div>
    <!-- 召唤师技能 -->
    <div class="summonSpell">
      <icons class="spell" type="summonSpell" :id="data.summonSpell1Id"></icons>
      <icons class="spell" type="summonSpell" :id="data.summonSpell2Id"></icons>
    </div>
    <!-- 符文天赋 -->
    <div class="rune">
      <icons class="icon main" type="rune" :id="data.keystoneId"></icons>
      <icons class="icon" type="rune" :id="data.perkSubStyle"></icons>
      
    </div>
    <!-- 召唤师 -->
    <div class="summon">
      <div class="name" @click="handleClickName">
        {{decodeURIComponent(data.name)}}
      </div>
      <div class="tags">
        <div class="tag svp" v-if="data.battleHonour.isSvp">SVP</div>
        <div class="tag mvp" v-if="data.battleHonour.isMvp">MVP</div>
        <div class="tag afk" v-if="data.wasAfk">逃跑</div>
        <div class="tag pentakill" v-if="data.battleHonour.isPentaKills" title="喜大普奔五杀了">五杀</div>
      </div>
    </div>
    <!-- 得分 -->
    <div class="score">
      <div class="gameScore">
        {{data.gameScore | gameScore}}
      </div>
    </div>

    <!-- KDA -->
    <div class="KDA">
      <div class="number">
        <span class="kill">{{data.championsKilled}}</span>
          <span class="gutter">/</span>
        <span class="death">{{data.numDeaths}}</span>
          <span class="gutter">/</span>
        <span class="assist">{{data.assists}}</span>
      </div>
      <div class="calc" 
        :class="{
          well: kda >= 5,
          normal: kda >= 3 && kda <=5,
          bad: kda < 3
        }"
      >
        {{kda}} : 1
      </div>
    </div>

    <!-- 装备 -->
    <div class="item">
      <div class="item-row">
        <icons class="icon" type="item" :id="data.item0"></icons>
        <icons class="icon" type="item" :id="data.item1"></icons>
        <icons class="icon" type="item" :id="data.item2"></icons>
        <icons class="icon" type="item" :id="data.item3"></icons>
        <icons class="icon" type="item" :id="data.item4"></icons>
        <icons class="icon" type="item" :id="data.item5"></icons>
        <icons class="icon" type="item" :id="data.item6"></icons>
      </div>
    </div>

  </div>
</template>

<script>
import icons from "./icons.vue"
import filters from "../mixins/filter.mixin"

export default {
  mixins:[filters],
  props:[
    "data",
  ],
  components:{
    icons,
  },
  computed:{
    kda(){
      let data = this.data;
      return ((data.championsKilled + data.assists) / (Math.max(data.numDeaths,1))).toFixed(2);
    }
  },
  methods:{
    handleClickName(){
      this.$emit("clickSummon", this.data);
    }
  }
  
}
</script>

<style lang="less" scoped>
  .battleDetailPlayer{
    height:40px;
    display:flex;
    flex-direction: row;
    padding:0px 5px;
    .champion{
      width:40px;
      height:40px;
      display:flex;
      position:relative;
      &.icon{
        flex:auto;
        object-fit: contain;
      }
      .badge{
        position:absolute;
        left:0px;
        bottom:0px;
        background-color: #000;
        color:#ddd;
        padding:0 3px;
        font-size:12px;
        transform: scale(0.8) translateX(-2px) translateY(2px);
        font-family:Verdana, Geneva, Tahoma, sans-serif;

      }
    }
    .summonSpell{
      display:flex;
      flex-direction: column;
      margin-left:5px;
      justify-content: space-between;
      .spell{
        flex:none;
        object-fit: contain;
        width:18px;
        height:18px;
        border-radius: 4px;;
      }
    }

    .rune{
      display:flex;
      flex-direction: column;
      margin-left:5px;
      justify-content: space-between;
      .icon{
        flex:none;
        width:18px;
        height:18px;
        object-fit: contain;
        &.main{
          border-radius: 50%;
          background-color: #000;
        }
      }
    }
    .summon{
      margin-left:5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width:150px;
      .name{
        font-size:14px;
        color:#fff;
        height:18px;
        line-height: 18px;
        cursor:pointer;
      }
      .tags{
        display:flex;
        flex-direction: row;
        font-size:12px;
        .tag{
          font-family: Consolas, Monaco, monospace;
          color:#000;
          padding:0 3px;
          user-select: none;
          font-weight: bold;
          border-radius: 2px;
          transform: scale(0.9);
          margin-right:3px;
          box-shadow:1px 1px 1px 0 rgba(0,0,0,0.8);
          &.svp{
            background-color:#eeeeee;
          }
          &.mvp{
            background-color:#f5e124;
          }
          &.afk{
            background-color:rgb(254, 87, 87);
          }
          &.pentakill{
            background-color:#f5e124;
          }
        }
      }
    }
    .score{
      width:60px;
      display:flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      .gameScore{
        
        color:#b59758;
        font-weight: bold;
        font-size:20px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }
    }
    .KDA{
      margin-left:5px;
      width:100px;
      display:flex;
      flex-direction: column;
      justify-content: space-around;
      color:#aaa;
      .number{
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size:12px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        .gutter{
          margin:0 2px;
        }
      }
      .calc{
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-size:12px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-weight: bold;
        &.well{
          color:#ff8200;
        }
        &.normal{
          color:#00bba3;
        }

      }
    }
    .item{
      margin-left:5px;
      display:flex;
      flex-direction: column;
      justify-content: center;
      width: 210px;
      overflow: hidden;
      .item-row{
        display:flex;
        flex-direction: row;
        height:30px;
        .icon{
          height:30px;
          width:30px;
          object-fit: contain;
          border-radius: 5px;
        }

      }
    }


  }
</style>