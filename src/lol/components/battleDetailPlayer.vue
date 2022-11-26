<template>
  <div class="battleDetailPlayer">
    <!-- 英雄 -->
    <div class="champion">
      <icons class="icon" type="champions" :id="data.championId"></icons>
      <!-- 等级 -->
      <div class="badge level" title="英雄等级">{{data.level}}</div>
      <!-- 预组队人数 -->
      <!-- <div class="badge teamSize" title="预组队人数">{{data.teamMadeSize}}</div> -->
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
        <div class="tag team team3" v-if="data.teamMadeSize===3">三黑</div>
        <div class="tag team team4" v-if="data.teamMadeSize===4">四黑</div>
        <div class="tag team team5" v-if="data.teamMadeSize===5">五黑</div>
        <div class="tag svp" v-if="data.battleHonour.isSvp">SVP</div>
        <div class="tag mvp" v-if="data.battleHonour.isMvp">MVP</div>
        <div class="tag afk" v-if="data.wasAfk">逃跑</div>
        <div class="tag pentakill" v-if="data.battleHonour.isPentaKills" title="喜大普奔五杀了">
          五杀<template v-if="data.pentaKills>1">×{{data.pentaKills}}</template>
        </div>
      </div>
    </div>
    
    

    <!-- Damage -->
    <div class="TotalData">
        <histogram 
          title="总伤害"
          class="damage graph" 
          :class="{
            highLight: data.totalDamageToChampions === maxData.totalDamageToChampions
          }"
          :value="data.totalDamageToChampions"
          :max="maxData.totalDamageToChampions"
          :text="(data.totalDamageToChampions / 1000).toFixed(1) + 'k'"
          :color="'#1dbaa9'"
        ></histogram>
        <histogram 
          title="总承伤"
          class="Taken graph"
          :class="{
            highLight: data.totalDamageTaken === maxData.totalDamageTaken
          }"
          :value="data.totalDamageTaken"
          :max="maxData.totalDamageTaken"
          :text="(data.totalDamageTaken / 1000).toFixed(1) + 'k'"
          :color="'#cccc'"
        ></histogram>
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

    <!-- <div class="space flex-auto"></div> -->

    <!-- 得分 -->
    <div class="score">
      <div class="gameScore">
        {{data.gameScore | gameScore}}
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./icons.vue"
import filters from "../mixins/filter.mixin"
import histogram from "./histogram.vue";

export default {
  mixins:[filters],
  props:[
    "data",
    "totalData",
  ],
  components:{
    icons,
    histogram,
  },
  computed:{
    kda(){
      let data = this.data;
      return ((data.championsKilled + data.assists) / (Math.max(data.numDeaths,1))).toFixed(2);
    },
    maxData(){
      const valueKey = ["totalDamageToChampions", "totalDamageTaken"];
      return this.totalData.reduce((p,c)=>{
        valueKey.forEach(key=>{
          p[key] = Math.max(p[key] || -Infinity, c[key] || -Infinity);
        });
        return p;
      }, {});
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
        background-color: #000;
        color:#ddd;
        padding:0 3px;
        font-size:12px;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        cursor:default;
        &.level{
          left:0px;
          bottom:0px;
          transform: scale(0.8) translateX(-2px) translateY(2px);
        }
        &.teamSize{
          right:0;
          top:0;
          transform: scale(0.8) translateX(2px) translateY(-2px);
        }
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
          &.team{
            background-color:#00b3ff;
          }
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
    .TotalData{
      min-width:100px;
      flex:auto;
      display:flex;
      flex-direction: column;
      justify-content: center;
      .graph{
        height:18px;
        color:#ccc;
        &.damage{
          color:#1dbaa9;
        }
        &.Taken{
          color:#ccc;
        }
        &.highLight{
          color:#ff8200;
          font-weight: bold;
        }
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