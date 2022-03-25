<template>
  <div class="roastTabel-container">
    <div class="power-card" v-if="showDetail">
      <div class="power">
        <div style="width: 100px">时间</div>
        <div style="flex: 100px">二氧化硫</div>
        <div style="flex: 100px">烟尘</div>
        <div style="flex: 100px">氮氧化物</div>
        <div style="flex: 100px">氧气含量</div>
      </div>
      <div class="test">
        <div class="power-cell">
          <div
            style="
              width: 75px;
              margin-bottom: 12px;
              font-size: 13px;
              color: #8f8f8f;
            "
            v-for="(item, index) in timeArr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="power-cell">
          <div
            style="
              width: 75px;
              margin-bottom: 12px;
              font-size: 13px;
              color: #8f8f8f;
            "
            v-for="(item, index) in so2Arr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="power-cell">
          <div
            style="
              width: 75px;
              margin-bottom: 12px;
              font-size: 13px;
              color: #8f8f8f;
            "
            v-for="(item, index) in smokeArr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="power-cell">
          <div
            style="
              width: 75px;
              margin-bottom: 12px;
              font-size: 13px;
              color: #8f8f8f;
            "
            v-for="(item, index) in no2Arr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="power-cell">
          <div
            style="
              width: 75px;
              margin-bottom: 12px;
              font-size: 13px;
              color: #8f8f8f;
            "
            v-for="(item, index) in o2Arr"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDevice10Data } from "@/api/environment/cems";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      showDetail: true,
      timeArr: [],
      so2Arr: [],
      smokeArr: [],
      no2Arr: [],
      o2Arr: [],
    };
  },
  computed: {
      ...mapGetters(["currentCode"]),
  },
  created() {},
  mounted() {
    // this.initTabel();
  },
  methods: {
    initTabel() {
      const params = {
        deviceCode: this.currentCode,
      };
      getDevice10Data(params).then((res) => {
        if (res.data.code === 200) {
          const { data } = res.data;
          // console.log(data);
          const timeArr = [];
          const so2Arr = [];
          const smokeArr = [];
          const no2Arr = [];
          const o2Arr = [];
          for (let i = 0; i < data.length; i++) {
            timeArr.push(data[i].dataTime.slice(11, 16));
            so2Arr.push(data[i].dataset[1].value);
            smokeArr.push(data[i].dataset[4].value);
            no2Arr.push(data[i].dataset[11].value);
            o2Arr.push(data[i].dataset[2].value);
          }
          this.timeArr = timeArr;
          this.so2Arr = so2Arr;
          this.smokeArr = smokeArr;
          this.no2Arr = no2Arr;
          this.o2Arr = o2Arr;
        }
      });
    },
  },
  watch: {
    currentCode: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue) {
        // console.log(newValue);
        this.initTabel();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.roastTabel-container {
  margin-top: 14px;
  background-color: #f1f1f1;
  //   margin-bottom: 20px;
}
.power-card {
  padding: 12px 14px;
  background-color: #ffffff;
  .test {
    display: flex;
  }
  .power {
    height: 44px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .power-cell {
    // height: 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
