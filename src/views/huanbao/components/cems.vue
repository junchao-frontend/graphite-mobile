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
    roastTabel
  },
  data() {
    return {
      tabHead: true,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
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
</style>
