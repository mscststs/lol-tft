<template>
  <div class="page">
    <!-- <div class="left">
      
    </div> -->
    <div class="right">
      <lol></lol>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
  html,body{
    width:100%;
    height:100%;
    padding:0;
    margin:0;
    position:relative;
    display:flex;
    flex-direction: row;
  }
  .page{
    display: flex;
    flex:auto;
    flex-direction: row;
    .left{
      width:300px;
      flex:none;
      padding:20px;
      background-color:#3c3c3c;
    }
    .right{
      flex:auto;
      background-color:#000;
    }
  }
</style>