
<template>
  <div class="hb-container">
    <van-tabs v-model="active">
      <van-tab title="CEMS"><cems /></van-tab>
      <van-tab title="VOc">内容 4</van-tab>
      <van-tab title="湿电">内容 2</van-tab>
      <van-tab title="吸料天车">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import cems from './components/cems.vue'
export default {
  name: "huan-bao",
  components: {
    cems
  },
  props: [],
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .van-tab__text{
  font-size: 13px;
}
/deep/ .van-tabs__line{
  bottom: 6vw;
  background-color:#01bb70;
}
</style>



