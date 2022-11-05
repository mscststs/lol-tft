<template>
  <div class="common">
    <summonerInfo v-bind="userInfo"></summonerInfo>
    <battleList v-bind="userInfo" style="margin-top:40px;"></battleList>
  </div>
</template>

<script>

import userInfoMixin from "../mixins/userInfo.mixin"
import summonerInfo from "../components/summonerInfo.vue";
import battleList from "../components/battleList.vue";

export default {
  mixins:[
    userInfoMixin
  ],
  components:{
    summonerInfo,
    battleList
  },
  async mounted(){
  }
}
</script>

<style lang="less" scoped>
  .common{
    display:flex;
    flex-direction: column;
    flex:auto;
    padding: 40px 80px;
  }
  
</style>