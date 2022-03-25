<template>
  <div class="roast-smoke">
    <div class="cemsTrend">
      <div class="head">
        <span class="head-left"></span>
        <span style="margin-left: 10px">烟尘</span>
      </div>
      <div id="Smoke"></div>
    </div>
  </div>
</template>

<script>
import { getMainCems } from "@/api/environment/cems";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
        code: "",
      roastCode: "",
      tunnelCode: "",
      tabHead: true,
      status: "",
      xData: [],
      yData: [],
      unit: '',
      cordonData: []
    };
  },
  computed: {
        ...mapGetters(["currentCode"]),
  },
  created() {},
  mounted() {
    // this.initSmokeTrend();
  },
  methods: {
    initSmokeTrend() {
        getMainCems().then(res => {
        if (res.data.code === 200) {
          var currentCems = "焙烧CEMS-烟尘Zs";
            if (this.currentCode === "130424LRTTS001") {
              currentCems = "焙烧CEMS-烟尘Zs";
            } else if (this.currentCode === "130424LRTTS002") {
              currentCems = "隧道窑/浸渍CEMS-烟尘Zs";
            }
            const data = res.data.data[currentCems];
          const xData = data.time
          const middleData = []
          xData.forEach(item => {
            middleData.push(item.slice(14, 16))
          })
          this.xData = middleData
          this.yData = data.data
          const cordonData = []
          for (let i = 0; i < data.data.length; i++) {
            cordonData.push('10')
          }
          this.cordonData = cordonData
          this.unit = data.unit
          this.initEcharts()
        }
      })
        .catch(error => {
          console.log(error)
        })
    },
    initEcharts () {
      const myChart = this.$echarts.init(document.getElementById('Smoke'))
      const option = {
        title: {
          // text: 'Temperature Change in the Coming Week'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '15%',
          bottom: '20%'
        },
        legend: {
          top: '0',
          itemWidth: 20,
          itemHeight: 10,
          selected: {
            // 选中'系列1'
            '烟尘Zs': true,
            // 不选中'系列2'
            警戒线: false
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
          // axisLabel: {
          //   formatter: '123'
          // }
        },
        series: [
          {
            name: '烟尘Zs',
            type: 'line',
            data: this.yData,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            zlevel: 3,
            // markPoint: {
            //   data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
            // },
            markLine: {
              symbol: 'none',
              data: [
                { type: 'average', name: 'Avg' }
              ]
            }
          },
          {
            name: '警戒线',
            type: 'line',
            data: this.cordonData,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            zlevel: 3,
            itemStyle: {
              color: '#ff8029'
              // borderColor: "#a3c8d8",
            },
            lineStyle: {
              normal: {
                width: 2,
                color: '#ff8029'
              }
            }
          }
        ]
      }
      option && myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  },
  watch: {
    currentCode: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue) {
        // console.log(newValue);
        this.initSmokeTrend();
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less" scoped>
.roast-smoke {
  background-color: #f1f1f1;
}
#Smoke{
    width: 100%;
    height: 250px;
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
.cemsTrend {
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
