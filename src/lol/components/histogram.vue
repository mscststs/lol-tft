<template>
  <div class="histogram-container">
    <div class="histogram-line">
      <div class="histogram-inner" :style="`width:${innerLength}; background-color:${color}`">
        
      </div>
    </div>
    <div class="desc" v-if="text">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props:[
    "max",
    "value",
    "color",
    "text"
  ],
  computed:{
    innerLength(){
      return ((this.value / this.max) * 100).toFixed(1) + "%";
    }
  },
}
</script>

<style lang="less" scoped>
  .histogram-container{
    display:flex;
    flex-direction: row;
    align-items: center;
    cursor:default;
    .histogram-line{
      flex:auto;
      display:flex;
      height: 50%;
      .histogram-inner{
        height:100%;
      }
    }
    .desc{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width:30px;
      font-size:12px;
      margin-left:5px;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
  }
</style>