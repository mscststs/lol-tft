<template>
  <div class="battleDetail">
    
  </div>
</template>

<script>
import rq from "../utils/request"
import userInfoMixin from "../mixins/userInfo.mixin"
import icons from "./icons.vue"


export default {
  mixins:[
    userInfoMixin
  ],
  props:[
    "gameId",
  ],
  data(){
    return {
      ready: false,
      openid:null,
      battleDetail: null
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
    }
  }
  
}
</script>

<style lang="less" scoped>
  .battleDetail{
    width: 500px;
    display:flex;
    flex-direction: column;
  }
  
</style>