<template>
  <div></div>
</template>

<script>
import rq from "../utils/request";
export default {
  props: ["area"],
  data() {
    return {};
  },
  async mounted() {
    let userInfo = await WegameLogin.default.getLoginUser();
    this.$router.replace({
      name: "summary",
      params: {
        area: this.area,
        accountType: 1,
        id: userInfo.uin,
      },
    });
  },
};
</script>

<style lang="less"></style>
