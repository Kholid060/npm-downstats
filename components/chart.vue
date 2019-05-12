<template>
  <v-card class="elevation-10 br5" min-height="384px">
    <v-container fluid>
      <apexchart width="100%" :height="height" :type="chartType" :options="options" :series="data"></apexchart>
    </v-container>
  </v-card>
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
          text: this.title
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: this.labels,
          labels: {
            show: showLabels
          }
        },
        yaxis: {
          labels: {
            formatter: (e) => { return formatNumber(e) }
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          }
        }
      }
    }
  },
  computed: {
    chartType () {
      return this.$props.data[0].data.length > 1 ? this.$props.type : 'bar'
    }
  },
  props: {
    title: {
      type: String,
      default: 'chart data'
    },
    type: {
      type: String,
      default: 'area'
    },
    height: {
      type: String,
      default: '480px'
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
