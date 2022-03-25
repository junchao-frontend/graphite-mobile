<template>
  <div class="shimo">
    <div class="tab-bottom">
      <span
        class="tab-bottom-left"
        :class="[tabHead ? 'text_color' : '']"
        @click="goHistory"
        >实时监测</span
      >
      <span @click="goHistory" :class="[tabHead ? '' : 'text_color']"
        >历史</span
      >
    </div>
    <div v-if="showReal">
      <realGra />
    </div>
    <div v-if="!showReal">
      <hisGra />
    </div>
  </div>
</template>

<script>
import realGra from "./real-gra.vue";
import hisGra from "./his-gra.vue";

export default {
  name: "pro-tunnel",
  components: {
    realGra,
    hisGra
  },
  data() {
    return {
      tabHead: true,
      showReal: true
    };
  },
  methods: {
    goHistory() {
      this.tabHead = !this.tabHead;
      this.showReal = !this.showReal
    }
  }
};
</script>

<style lang="less"  scoped>
.shimo {
  background-color: #f1f1f1;
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
