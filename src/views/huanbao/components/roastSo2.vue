<template>
  <div class="roast-so2">
    <div class="cemsTrend">
      <div class="head">
        <span class="head-left"></span>
        <span style="margin-left: 10px">SO2</span>
      </div>
      <div id="SO2"></div>
    </div>
  </div>
</template>

<script>
import { getCemsLabel } from "@/api/environment/cems";
import { getMainCems } from "@/api/environment/cems";
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
  computed: {},
  created() {},
  mounted() {
    this.initLabel();
  },
  methods: {
      initLabel() {
      const params = {
        _id: "61d9601597ebb3c90fed18a7",
      };
      getCemsLabel(params).then((res) => {
        if (res.data.code === 200) {
          const { data } = res.data;
          const roastCode = data[0].code;
          const status = data[0].status;
          const tunnelCode = data[1].code;
          this.code = roastCode;
          this.status = status;
          this.roastCode = roastCode;
          this.tunnelCode = tunnelCode;
          this.initSo2Trend()
        }
      });
    },
    initSo2Trend() {
        getMainCems().then(res => {
        if (res.data.code === 200) {
          const data = res.data.data['焙烧CEMS-二氧化硫Zs']
          const xData = data.time
          const middleData = []
          xData.forEach(item => {
            middleData.push(item.slice(14, 16))
          })
          this.xData = middleData
          this.yData = data.data
          const cordonData = []
          for (let i = 0; i < data.data.length; i++) {
            cordonData.push('35')
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
      const myChart = this.$echarts.init(document.getElementById('SO2'))
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
            '二氧化硫Zs': true,
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
            name: '二氧化硫Zs',
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
};
</script>

<style lang="less" scoped>
.roast-so2 {
  background-color: #f1f1f1;
}
#SO2{
    width: 100%;
    height: 250px;
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
