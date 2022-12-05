<template>
  <div class="common" v-if="ready">
    <panel title="搜索结果">
      <div class="errorText" v-if="errorText">
        {{ errorText }}
      </div>

      <div class="players" v-if="players.length">
        <div
          class="player"
          v-for="player of players"
          :key="player.openid"
          @click="toPlayer(player)"
        >
          <icons class="icon" type="usericon" :id="player.icon_id"></icons>
          <div class="gutter"></div>
          <div class="text name">
            {{ nickname }}
          </div>
          <div class="gutter"></div>
          <div class="text area">
            {{ getAreaName(player.area) }}
          </div>
          <div class="gutter"></div>
          <div class="text level">等级: {{ player.level }}</div>
        </div>
      </div>

      <div class="empty" v-else>没有结果</div>
    </panel>
  </div>
</template>

<script>
import rq from "../utils/request";
import panel from "../components/view/panel.vue";
import icons from "../components/icons.vue";
import areas from "../const/areas";

export default {
  components: {
    panel,
    icons,
  },
  props: ["nickname"],
  data() {
    return {
      ready: false,
      errorText: "",
      players: [],
    };
  },
  async mounted() {
    await Promise.all([this.search()]);
    this.ready = true;
  },
  methods: {
    async search() {
      try {
        let { players } = await rq.SearchPlayer({
          nickname: this.nickname,
          from_src: "lol_helper",
        });
        // 等级高的在前面
        this.players = players.sort((a, b) => b.level - a.level);
      } catch (e) {
        this.errorText = e.message;
      }
    },
    toPlayer({ area, openid }) {
      this.$router.push({
        name: "summary",
        params: {
          area: area,
          accountType: 2,
          id: openid,
        },
      });
    },
    getAreaName(id) {
      let v = areas.find((v) => v.v == id);
      if (v) {
        return v.t;
      } else {
        return "未知-" + id;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.common {
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 40px 80px;
  .players {
    .player {
      display: flex;
      flex-direction: row;
      height: 40px;
      padding: 10px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .gutter {
        width: 1px;
        background-color: #24292e;
        margin: 0 15px;
      }
      .icon {
        width: 40px;
        height: 40px;
        object-fit: contain;
      }
      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
      }
    }
  }
  .errorText {
    display: flex;
    height: 60px;
    font-size: 14px;
  }
  .empty {
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
  }
}
</style>
