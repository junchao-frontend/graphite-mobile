<template>
  <!-- 炉阻 -->
  <div id="furnace-card"></div>
</template>

<script>
export default {
  name: "furnace-card",
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
        this.initEchart(newData);
      },
    },
  },
  methods: {
    initEchart(newData) {
      const chartDom = document.getElementById("furnace-card");
      const myChart = this.$echarts.init(chartDom);
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
        yAxis: {
          type: "value",
          name: "炉阻",
        },
        series: [
          {
            type: "line",
          },
        ],
        dataset: {
          source: newData,
        },
      };
      if (this.frist) {
        option && myChart.setOption(option);
        this.frist = false;
      } else {
        this.updateEchartData(myChart, newData);
      }
    },
    updateEchartData(myChart, data) {
      const option = {
        dataset: {
          source: data, // 数组
        },
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
#furnace-card {
  width: 100%;
  height: 100%;
}
</style>
