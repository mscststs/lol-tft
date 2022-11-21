<template>
  <div class="common" v-if="ready">
    <summonerInfo v-bind="userInfo"></summonerInfo>
    <battleList v-bind="userInfo" style="margin-top:40px;"></battleList>
  </div>
</template>

<script>

import userInfoMixin from "../mixins/userInfo.mixin"
import summonerInfo from "../components/summonerInfo.vue";
import battleList from "../components/battleList.vue";
import {inits} from "../const/asyncValues"

export default {
  mixins:[
    userInfoMixin
  ],
  components:{
    summonerInfo,
    battleList
  },
  data(){
    return {
      ready: false,
    }
  },
  async mounted(){
    try{
      await Promise.all([
        ...inits.map(v=>v())
      ]);
      this.ready = true;
    }catch(e){
      console.error(e);
      alert("初始化图标失败")
    }
  },
}
</script>

<style lang="less" scoped>
  .common{
    display:flex;
    flex-direction: column;
    flex:auto;
    padding: 40px 80px;
    min-width:1100px;
    max-width:1440px;
  }
  
</style>