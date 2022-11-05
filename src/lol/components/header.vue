<template>
  <div class="tftHeader">
    <!-- 区服选择 -->
    <div class="block">
      <select v-model="selectArea" class="selector">
        <option value="" disabled class="selector-options">选择区服</option>
        <option v-for="item of areas"
        class="selector-options"
        :key="item.v"
        :value="item.v">
          {{item.t}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import areas from "../const/areas"
import storage from "../utils/storage"
export default {
  data(){
    return {
      areas,
      selectArea: "",
    }
  },
  mounted(){
    if(this.$route.params.area){
      this.selectArea = this.$route.params.area
    }else if(storage.get("area")){
      this.selectArea = storage.get("area");
    }
  },
  watch:{
    selectArea(val){
      if(val){
        storage.set("area",val);
        if(this.$route.params.area !== val){
          this.$router.replace({ name: 'area', params: { area: val }})

        }
      }
    }
  }
}
</script>

<style lang="less">
  .tftHeader{
    height:75px;
    width:100%;
    display:flex;
    flex:none;
    background-color: #1a2026;
    border-bottom: 1px solid #24292e;
    
    .selector{
      background-color: transparent;
      border:none;
      outline:none;
      color:#b59758;
      .selector-options{
        background-color:#000;
        color:#b59758;
        padding: 3px 0;

      }
    }
    .block{
      display:flex;
      flex:none;
      justify-content: center;
      align-items: center;
      padding:20px;
      font-size:15px;
    }
  }
</style>