<template>
  <div class="battleList">
    <panel title="对局记录">
    <div class="container">
      <div class="list">
        <battleListItem 
          v-for="item of battles"
          :key="item.game_id"
          :data="item"
        ></battleListItem>
      </div>
      <div class="detail">
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
import battleListItem from "./battleListItem.vue"

export default {
  mixins:[
    userInfoMixin
  ],
  components:{
    panel,
    battleListItem,
  },
  data(){
    return {
      ready:false,
      
      form:{
        count: 7,
      },
      hasMore:true,

      battles:[]
    }
  },
  computed:{
    battlesMap(){
      return this.battles.map(v=>v.game_id)
    }
  },
  async mounted(){
    await Promise.all([
      this.getBattleList(),
    ]);
    this.ready = true;
  },
  methods:{
    async getBattleList(){
      let { battles } = await rq.GetBattleList({
        ...this.rqOptions,
        ...this.form,
        offset: this.battles.length
      });

      if(battles.length < this.form.count){
        this.hasMore = false;
      }

      this.battles.push(...battles.filter(v=>!this.battlesMap.includes(v.game_id)))

    }
  }
}
</script>

<style lang="less" scoped>
  .battleList{
      min-width:700px;
    .list{
      min-width:650px;
    }
  }
</style>