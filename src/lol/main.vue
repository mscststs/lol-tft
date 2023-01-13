<template>
  <div class="main">
    <tftHeader></tftHeader>

    <div class="wrap">
      <div class="bgImg"></div>
      <div class="comp">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tftHeader from "./components/header.vue";
export default {
  components: {
    tftHeader,
  },
};
</script>

<style lang="less">
@import "./assets/common.less";

* {
  box-sizing: content-box;
}
.main {
  display: flex;
  flex: auto;
  width: 100%;
  height: 100%;
  background-color: #19212b;
  color: #ddd;
  box-sizing: border-box;
  flex-direction: column;
}
.wrap {
  display: flex;
  flex: auto;
  position: relative;
  overflow: hidden;
  .bgImg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://wsd.pages.dev/pics/lol-bg.webp);
    background-size: 100% auto;
    background-repeat: no-repeat;
    z-index: 1;
  }
  .comp {
    display: block;
    width: 100%;
    z-index: 10;
    overflow: auto;
    overflow: overlay;
  }
}

// 滚动条
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: #b59758;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: #19212b 0 0;
}
</style>
