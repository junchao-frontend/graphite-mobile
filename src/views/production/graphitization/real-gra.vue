<template>
  <div class="shimo">
    <!-- 石墨化 -->
    <div class="head">
      <span class="head-left"></span>
      <div class="head-number">{{ headData.headTitle }}</div>
      <div class="head-right">
        炉号{{ headData.stoveNumber }} | 状态 {{ headData.deviceStatus }} |
        {{ headData.stoveStatus }}
      </div>
    </div>
    <!--  -->
    <div class="van-hairline--bottom"></div>
    <div class="head-tag">
      <div>
        <div class="tag-title">{{ headData.startTime }}</div>
        <div class="tag-type">生产时间</div>
        <div class="tag-bottom">
          时长: <span class="tag-bottom-text">{{ headData.runTime }}</span>
        </div>
      </div>
      <div>
        <div class="tag-title">{{ electricAmount.price }}</div>
        <div class="tag-type">单价</div>
        <div class="tag-bottom">
          <span class="tag-bottom-text"></span>
        </div>
      </div>
      <div>
        <div class="tag-title">{{ electricAmount.totalKWH }}</div>
        <div class="tag-type">总电量</div>
      </div>
      <div>
        <div class="tag-title">{{ electricAmount.totalPrice }}</div>
        <div class="tag-type">总电价</div>
      </div>
    </div>

    <!-- 耗电量 -->
    <div class="head">
      <span class="head-left"></span>
      <div class="head-number">耗电量</div>
      <div class="head-right">
        {{ electricAmount.totalKWH }}kWh | {{ electricAmount.totalPrice }}元 |
        {{ electricAmount.price }}元/kWh
      </div>
    </div>
    <div class="power-card" v-if="showDetail">
      <div class="power">
        <div style="width: 100px">电度</div>
        <div style="flex: 100px">电量(占比)</div>
        <div style="flex: 100px">总价(占比)</div>
      </div>
      <div class="power-cell">
        <div style="width: 100px">低谷</div>
        <div style="flex: 100px">
          {{
            electricAmountDetail[0].value ? electricAmountDetail[0].value : ""
          }}
        </div>
        <div style="flex: 100px">
          {{
            electricAmountDetail[1].value ? electricAmountDetail[0].value : ""
          }}
        </div>
      </div>
      <div class="power-cell">
        <div style="width: 100px">平段</div>
        <div style="flex: 100px">{{ electricAmountDetail[3].value }}</div>
        <div style="flex: 100px">{{ electricAmountDetail[4].value }}</div>
      </div>
      <div class="power-cell">
        <div style="width: 100px">高峰</div>
        <div style="flex: 100px">{{ electricAmountDetail[6].value }}</div>
        <div style="flex: 100px">{{ electricAmountDetail[7].value }}</div>
      </div>
      <div class="power-cell">
        <div style="width: 100px">尖峰</div>
        <div style="flex: 100px">{{ electricAmountDetail[9].value }}</div>
        <div style="flex: 100px">{{ electricAmountDetail[10].value }}</div>
      </div>
    </div>

    <!-- 图表 -->
    <div class="echartCard">
      <crewCard :chartsData="graphiteLine" />
    </div>
    <div class="echartCard">
      <furnaceCard :chartsData="graTemper" />
    </div>
    <div class="echartCard">
      <powerCard :chartsData="stoveAndVA1" />
    </div>
    <div class="echartCard">
      <powerCard :chartsData="stoveAndVA2" />
    </div>
    <div class="echartCard">
      <powerCard :chartsData="stoveAndVA3" />
    </div>
  </div>
</template>

<script>
import { GetGraForm } from "@/api/production/index.js";
import crewCard from "./crew-card.vue";
import furnaceCard from "./furnace-card.vue";
import powerCard from "./power-card.vue";
export default {
  name: "production-graphit",
  components: {
    crewCard,
    furnaceCard,
    powerCard,
  },
  data() {
    return {
      tabHead: true,
      headData: {},
      websock: null,
      graConfiguration: [],
      graTemper: [], // 炉阻
      graphiteLine: [], // 功率vs位移
      stoveAndVA1: [],
      stoveAndVA2: [],
      stoveAndVA3: [],
      electricAmount: {},
      electricAmountDetail: [],
      showDetail: false,
    };
  },
  mounted() {
    this.getHeadData();
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); // 离开路由之后断开websocket连接
  },
  methods: {
    goHistory() {
      this.tabHead = !this.tabHead;
      // this.$router.push('/grahistory')
    },
    async getHeadData() {
      const res = await GetGraForm();
      console.log(res);
      if (res.data.code === 200) {
        this.headData = res.data.data;
        this.electricAmount = res.data.data.electricAmount;
        this.electricAmountDetail = res.data.data.electricAmount.detail;
        this.showDetail = true
      }
    },
    initWebSocket() {
      this.websock = new WebSocket(
        "ws://101.42.233.226:8060/getGraphiteWSData"
      );
      this.websock.onmessage = this.websocketonmessage;
    },
    websocketonmessage(e) {
      // console.log("接收到的石墨化数据", JSON.parse(e.data));
      const res = JSON.parse(e.data);
      // 功率vs位移
      this.graphiteLine = res.graphiteLine.source;
      // 炉阻
      this.graTemper = res.graTemper.source;
      // 机组
      this.stoveAndVA1 = res.stoveAndVA.source1;
      this.stoveAndVA2 = res.stoveAndVA.source2;
      this.stoveAndVA3 = res.stoveAndVA.source3;
    },
  },
};
</script>

<style lang="less"  scoped>
.shimo {
  background-color: #f1f1f1;
}
.head {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  background-color: #ffffff;
  margin-top: 14px;
  &-left {
    width: 5px;
    height: 30px;
    background-color: #01bb70;
  }
  &-number {
    margin-left: 8px;
    font-size: 16px;
    height: 25px;
    line-height: 25px;
  }
  &-right {
    margin-left: auto;
    padding: 0 10px;
    background-color: #f2f2f2;
    height: 25px;
    border-radius: 12px;
    line-height: 25px;
    text-align: center;
    font-size: 10px;
  }
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
.head-tag {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-template-rows: 80px 80px;
  justify-items: center;
  align-items: center;
  font-size: 10px;
  .tag-title {
    color: #55c0bc;
    text-align: center;
  }
  .tag-type {
    width: 60px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background-color: #f3f3f3;
    margin: auto;
  }
  .tag-bottom {
    color: #bebebe;
    text-align: center;
  }
  .tag-bottom-text {
    color: #55c0bc;
  }
}
.power-card {
  padding: 12px 14px;
  background-color: #ffffff;
  .power {
    height: 44px;
    background-color: #f6f6f6;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .power-cell {
    height: 44px;
    display: flex;
    align-items: center;
    text-align: center;
  }
}

.echartCard {
  width: 100%;
  height: 250px;
  background-color: #ffffff;
  margin-top: 12px;
}
</style>
