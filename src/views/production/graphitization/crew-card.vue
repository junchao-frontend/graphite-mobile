<template>
  <!-- 功率vs位移 -->
  <div id="crew-card"></div>
</template>

<script>
export default {
  name: "crew-card",
  props: {
    chartsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      frist: true,
    };
  },
  watch: {
    chartsData: {
      handler(newData) {
        this.initCrew(newData);
      },
    },
  },
  methods: {
    initCrew(newVal) {
      const chartDom = document.getElementById("crew-card");
      const MyChart = this.$echarts.init(chartDom);
      let option;
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          data: ["有功功率", "功率设定", "位移"],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "0%",
        },
        xAxis: {
          type: "category",
          axisTick: {
            // 不显示轴刻度
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            interval: "auto",
            formatter: function (value) {
              return value.match(/(?<=\s).{3,5}/)[0];
            },
            textStyle: {
              fontSize: 8,
            },
          },
        },
        yAxis: [
          {
            name: "功率(kW)",
            type: "value",
            splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 8,
              },
            },
          },
          {
            name: "位移(mm)",
            type: "value",
            splitLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 8,
              },
            },
          },
        ],
        series: [
          {
            name: "有功功率",
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 4,
            encode: {
              x: 0,
              y: 1,
            },
          },
          {
            name: "位移",
            type: "line",
            smooth: true,
            showAllSymbol: false,
            symbol: "circle",
            symbolSize: 3,
            xAxisIndex: 0,
            yAxisIndex: 1,
            encode: {
              x: 0,
              y: 2,
            },
          },
          {
            name: "功率设定",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 2,
            lineStyle: {
              width: 1.5,
            },
            encode: {
              x: 0,
              y: 3,
            },
          },
        ],
        dataset: {
          source: newVal,
        },
      };
      if (this.frist) {
        option && MyChart.setOption(option);
        this.frist = false;
      } else {
        this.updateEchartData(MyChart, newVal);
      }
    },
    updateEchartData(MyChart, data) {
      const option = {
        dataset: {
          source: data, // 数组
        },
      };
      MyChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#crew-card {
  width: 100%;
  height: 100%;
}
</style>
