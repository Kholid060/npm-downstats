<template>
    <apexcharts v-if="loaded" :type="chartType" :height="chartHeight" :options="options" :series="data"></apexcharts>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { formatNumber } from '../utils/formatter'
export default {
  components: { apexchart: VueApexCharts },
  data () {
    let showLabels = !(this.labels.length > 40)
    return {
      isLoaded: false,
      options: {
        fill: {
          colors: ['#03a9f4', '#00E676', '#FDD835']
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: ''
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: this.labels,
          labels: {
            show: true
          }
        },
        yaxis: {
          labels: {
            formatter: (e) => { return formatNumber(e) }
          }
        },
        tooltip: {
          style: {
            fontFamily: 'Roboto'
          },
          onDatasetHover: {
            highlightDataSeries: true
          },
          x: {
            format: 'MMMM dd, yyyy'
          }
        }
      }
    }
  },
  computed: {
    chartType () {
      return this.$props.data[0].data.length > 1 ? this.$props.type : 'bar'
    },
    chartHeight () {
      return window.innerHeight - 75
    }
  },
  props: {
    title: {
      type: String,
      default: 'chart data'
    },
    data: {
      type: Array | Object
    },
    labels: {
      type: Array
    }
  }
}

</script>
<style>
.apexcharts-title-text {
  font-weight: 500;
  font-family: Roboto !important;
  font-size: 17px;
}

</style>
