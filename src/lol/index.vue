<template>
  <div class="main">
    <tftHeader></tftHeader>

    <div class="wrap">
      <div class="bgImg">
      </div>
      <div class="comp">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import tftHeader from "./components/header.vue"
import router from "./router"
export default {
  components:{
    tftHeader,
  },
  router
}
</script>


<style lang="less">
  .main{
    display:flex;
    flex:auto;
    width:100%;
    height:100%;
    background-color:rgb(25, 35, 43);
    color:white;
    box-sizing: border-box;
    flex-direction: column;
  }
  .wrap{
    display:flex;
    flex:auto;
    position: relative;
    .bgImg{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background-image: url(https://game.gtimg.cn/images/lol/lolstrategy/bg.jpg);
      background-size: 100% auto;
      background-repeat: no-repeat;
      z-index:1;
    }
    .comp{
      display:flex;
      flex-direction: column;
      flex:auto;
      z-index:10;
      overflow-y: auto;
    }
  }

  // 滚动条
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
  }
  ::-webkit-scrollbar-thumb{
    background:#b59758;
    border-radius:5px;
  }
  ::-webkit-scrollbar-track{
    background:0 0;
  }
</style>