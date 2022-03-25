<template>
  <div class="roast-label">
    <div class="cemsLabel">
      <div class="head">
        <span class="head-left"></span>
        <span style="margin-left: 10px">{{ currentCode }}</span>
        <div class="head-status">状态: {{ status }}</div>
      </div>
      <div class="label-box">
          <div class="label-box-item" v-for="(item,index) in labelData" :key="index">
              <div style="color: #01bb70">{{item.value}}</div>
              <div style="font-size: 10px;color:#8f8f8f">{{item.name}}</div>
              <!-- <span style="font-size: 10px;color:#8f8f8f">{{item.name}}</span> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCemsLabel } from "@/api/environment/cems";
import { getDeviceRealData } from "@/api/environment/cems";
import { mapGetters } from 'vuex';
export default {
  components: {},
  data() {
    return {
      code: "",
      status: "",
      roastCode: "",
      tunnelCode: "",
      labelData: []
    };
  },
  computed: {
    ...mapGetters(['currentCode'])
  },
  created() {},
  mounted() {
    this.initStatus();
  },
  methods: {
    initStatus() {
      const params = {
        _id: "61d9601597ebb3c90fed18a7",
      };
      getCemsLabel(params).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          const { data } = res.data;
          const roastCode = data[0].code;
          const status = data[0].status;
          this.code = roastCode;
          this.status = status;
          this.$store.commit('getCemsCode',roastCode)
          this.initLabel();
        }
      });
    },
    initLabel() {
        const params = {
            collName: 'DataRealTimeColl',
            deviceCode: this.currentCode
        }
        getDeviceRealData(params).then(res => {
            if(res.data.code === 200) {
                const {data} = res.data
                // console.log(data, 'data');
                this.labelData = data.dataset.splice(0,8)
                this.labelData.forEach(item => {
                    item.realData = '实时'
                })
            }
        })
    }
  },
  watch: {
    currentCode: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue){
        // console.log(newValue);
        this.initLabel()
      },
      // immediate:true
    }
  }
};
</script>

<style lang="less" scoped>
.label-box{
    padding: 10px 0px 0px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap-reverse;
    &-item{
        width: 25%;
        margin-bottom: 20px;
    }
}
.cemsLabel {
  background-color: #ffffff;
  .head {
    height: 40px;
    display: flex;
    align-items: center;
    padding: 3px 10px;
    margin-top: 14px;
    &-status {
      font-size: 13px;
      margin-left: 150px;
      padding: 7px;
      border-radius: 15px;
      background-color: #f2f2f2;
    }
    &-left {
      width: 5px;
      height: 30px;
      background-color: #01bb70;
    }
  }
}
</style>
