<template>
  <div id="power-card" ref="echartsPoly"></div>
</template>

<script>
export default {
  name: "power-card",
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
      let seriesGroup = [];
      let ArrSeries = [];
      if (newData[0].length !== 0) {
        ArrSeries = [...newData[0]];
        ArrSeries.shift();
        ArrSeries.forEach((item) => {
          seriesGroup.push({
            encode: {
              x: "createTime",
              y: item,
            },
            name: item,
            type: "line",
            symbol: "circle", // 节点样式
          });
        });
      }
      // const chartDom = document.getElementById("power-card");
      const myChart = this.$echarts.init(this.$refs.echartsPoly);
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
          data: ArrSeries,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: {
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
          name: ArrSeries[0].match(/.{2}$/)[0],
          nameTextStyle: {
            align: "right",
          },
        },
        series: seriesGroup,
        dataset: {
          source: newData,
        },
      };
      option && myChart.setOption(option);
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
#power-card {
  width: 100%;
  height: 100%;
}
</style>
