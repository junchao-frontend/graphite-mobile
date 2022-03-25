<template>
  <div class="cems-container">
    <div class="tab-bottom">
      <span
        class="tab-bottom-left"
        :class="[tabHead ? 'text_color' : '']"
        @click="tabHead = !tabHead"
        >实时监测</span
      >
      <span :class="[tabHead ? '' : 'text_color']" @click="tabHead = !tabHead"
        >历史</span
      >
      <van-dropdown-menu >
        <van-dropdown-item @change="changeCode" v-model="value" :options="option1" />
      </van-dropdown-menu>
    </div>
    <div>
      <roastLabel />
    </div>
    <div>
      <roastSo2 />
    </div>
    <div>
      <roastNo2 />
    </div>
    <div>
      <roastSmoke />
    </div>
    <div>
      <roastO2 />
    </div>
    <div>
      <roastTabel />
    </div>
  </div>
</template>

<script>
import roastSo2 from "./roastSo2.vue";
import roastNo2 from "./roastNo2.vue";
import roastSmoke from "./roastSmoke.vue";
import roastO2 from "./roastO2.vue";
import roastLabel from "./roastLabel.vue";
import roastTabel from "./roastTabel.vue";
export default {
  name: "cems-hb",
  components: {
    roastSo2,
    roastO2,
    roastSmoke,
    roastNo2,
    roastLabel,
    roastTabel,
  },
  data() {
    return {
      tabHead: true,
      value: 0,
      option1: [
        { text: "焙烧CEMS", value: 0 },
        { text: "隧道窑CEMS", value: 1 },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    changeCode(value) {
      if(value === 0) {
          this.$store.commit('getCemsCode','130424LRTTS001')
      } else if(value === 1) {
          this.$store.commit('getCemsCode','130424LRTTS002')
      }
    }
  },
};
</script>

<style lang="less" scoped>
.cems-container {
  background-color: #f1f1f1;
}
#SO2 {
  width: 100%;
  height: 400px;
}
.tab-bottom {
  height: 24px;
  padding-left: 10px;
  padding-top: 4px;
  color: #9d9d9d;
  background-color: #ffffff;
  &-left {
    margin-right: 8px;
  }
  .text_color {
    color: #01bb70;
  }
}
/deep/ .van-dropdown-menu {
  // margin-left: 3px;
  display: inline-block;
  width: 100px;
  height: 20px;
  .van-dropdown-menu__bar {
    height: 20px;
  }
  .van-dropdown-menu__item {
    height: 20px;
  }
  .van-ellipsis {
    font-size: 14px;
    color: #9d9d9d;
  }
}
</style>
