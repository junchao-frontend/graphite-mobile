<template>
  <van-tabs v-model="active" color="#01bb70">
    <van-tab title="石墨化"><graphitization /></van-tab>
    <van-tab title="隧道窑"> <tunnel/></van-tab>
    <van-tab title="浸渍"> <dipping/></van-tab>
    <van-tab title="成型"> <forming/> </van-tab>
  </van-tabs>
</template>

<script>
import graphitization from "./graphitization/index.vue";
import dipping from "./dipping/index.vue";
import tunnel from "./tunnel/index.vue";
import forming from "./forming/index.vue";

export default {
  name: "pro-index",
  components: {
    graphitization,
    dipping,
    tunnel,
    forming
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
</style>
