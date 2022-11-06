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
    <div class="gutter"></div>
    <div class="block button" @click="toSelf" v-if="$route.params.area">
      我的战绩
    </div>
    <div class="gutter"></div>

    <div class="space"></div>

    <div class="gutter"></div>

    <div class="block button" @click="donate">
      向开发者捐赠
    </div>

    <div class="gutter"></div>

    <div class="block button" @click="mainPage">
      主页
    </div>

    <div class="gutter"></div>

    <div class="block button" @click="openRepo">
      Github
    </div>

    <div class="gutter"></div>

    <div class="block button" @click="bugReport">
      问题反馈
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
  },
  methods:{
    toSelf(){
      this.$router.replace({ name: 'area', params: { area: this.$route.params.area }});
    },
    donate(){
      window.open("https://wsd.pages.interface.work/view?src=https%3A%2F%2Fpic.mscststs.com%2Fdonate.jpg");
    },
    mainPage(){
      window.open("https://greasyfork.org/zh-CN/scripts/454184");
    },
    openRepo(){
      window.open("https://github.com/mscststs/lol-tft");
    },
    bugReport(){
      window.open("https://github.com/mscststs/lol-tft/issues/new")
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
      &.button{
        cursor:pointer;
        color:#b59758;
        font-size:14px;
        &:hover{
          background-color:rgba(255,255,255,0.05);
        }
      }
    }
    .gutter{
      width:1px;
      background-color: #24292e;
    }
    .space{
      flex:auto;
    }
  }
</style>