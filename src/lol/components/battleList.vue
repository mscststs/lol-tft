<template>
  <div class="battleList" v-if="ready">
    <panel title="对局记录">
      <div class="container">
        <div class="list">
          <template v-if="!battles.length">
            <div class="no-data text">暂无数据</div>
          </template>
          <battleListItem
            class="list-item"
            :class="{
              selected: selectedGame === item.game_id,
            }"
            @click.native="handleSelect(item)"
            v-for="(item, index) of battles"
            :index="index"
            :key="item.game_id"
            :data="item"
          ></battleListItem>

          <template v-if="hasMore">
            <div class="loadMore" @click="getBattleList">
              <div class="moreText">点击加载更多</div>
            </div>
          </template>
        </div>

        <div class="gutter"></div>

        <div class="detail" v-if="selectedGame">
          <battleDetail v-bind="userInfo" :gameId="selectedGame"></battleDetail>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import rq from "../utils/request";
import userInfoMixin from "../mixins/userInfo.mixin";
import panel from "./view/panel.vue";
import icons from "./icons.vue";
import battleListItem from "./battleListItem.vue";
import battleDetail from "./battleDetail.vue";

export default {
  mixins: [userInfoMixin],
  components: {
    panel,
    battleListItem,
    battleDetail,
  },
  data() {
    return {
      ready: false,

      form: {
        count: 10,
      },
      hasMore: true,

      selectedGame: null,

      battles: [],
    };
  },
  computed: {
    battlesMap() {
      return this.battles.map((v) => v.game_id);
    },
  },
  async mounted() {
    await Promise.all([this.getBattleList()]);
    if (this.battles.length) {
      // 自动展开第一局
      this.handleSelect(this.battles[0]);
    }
    this.ready = true;
  },
  methods: {
    handleSelect(item) {
      this.selectedGame = item.game_id;
    },
    async getBattleList() {
      let { battles } = await rq.GetBattleList({
        ...this.rqOptions,
        ...this.form,
        offset: this.battles.length,
      });

      if (battles.length < this.form.count) {
        this.hasMore = false;
      }

      this.battles.push(...battles.filter((v) => !this.battlesMap.includes(v.game_id)));
    },
  },
};
</script>

<style lang="less" scoped>
.battleList {
  min-width: 700px;
  min-height: 600px;
  .container {
    display: flex;
    flex-direction: row;
    .list {
      width: 300px;
      max-height: 600px;
      flex: none;
      overflow: auto;
      overflow:overlay .no-data {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
      }
      .list-item {
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
          cursor: pointer;
        }
        &.selected {
          background-color: #28344e;
          position: sticky;
          top: 0px;
          bottom: 0px;
          z-index: 10;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.6);
          &.失败 {
            background-color: #59343b;
          }
        }
      }
      .loadMore {
        width: 100%;
        margin-top: 10px;
        padding: 10px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }
      }
    }

    .gutter {
      width: 1px !important;
      height: auto !important;
      background-color: #4c463d;
      margin: 0px 10px !important;
    }
    .detail {
      flex: auto;
      min-width: 650px;
      height: 600px;
    }
  }
}
</style>
