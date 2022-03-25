<template>
  <div>
    <div>
      <router-view />
    </div>
    <div class="app-bottom">
      <van-tabbar route v-model="active" active-color="#01bb70">
        <van-tabbar-item icon="qr" to="/">生产</van-tabbar-item>
        <van-tabbar-item icon="cluster-o" to="/huanbao" >环保</van-tabbar-item>
        <van-tabbar-item icon="orders-o">平衡表</van-tabbar-item>
        <van-tabbar-item icon="user-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-layout",
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped>
.app-bottom{
  padding-bottom: 60px;
}
</style>
