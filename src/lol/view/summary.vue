<template>
  <div>
    
  </div>
</template>

<script>
import rq from "../utils/request"

export default {
  props:[
    "area",
    "accountType",
    "id"
  ],
  computed:{
    rqOptions(){
      return {
        account_type: parseInt(this.accountType),
        area: parseInt(this.area),
        id: this.id,
        from_src: "lol_helper"
      }
    }
  },
  async mounted(){
    let res = await rq.GetSummonerInfo(this.rqOptions);
    console.log(res);
  }
}
</script>

<style lang="less">
  
</style>