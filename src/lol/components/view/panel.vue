<template>
  <div class="panel">
    <div class="panel-title">
      <div class="panel-title-text">
        {{title}}
      </div>
      <div class="auto-flex"></div>
    </div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    "title"
  ]
}
</script>

<style lang="less" scoped>
  .auto-flex{
    flex:auto;
  }
  .panel{
    display:flex;
    flex-direction: column;
    padding:20px;
    background-color:#161a20;
    .panel-title{
      display:flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;

      padding-bottom: 10px;
      border-bottom: 1px solid #4c463d;
      .panel-title-text{
        color:white;
      }
    }
    .panel-content{
      padding:10px 0 ;
    }

  }
</style>