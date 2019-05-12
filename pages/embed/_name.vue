<template>
  <v-layout fill-height>
    <v-card width="100%" flat>
      <v-card-title class="py-2">
          <span class="capitalize subheading font-weight-medium">
            {{packages.join('and')}} download statistic
          </span>
          <v-spacer></v-spacer>
          <v-btn icon class="ma-0 pa-0" @click="openInNewTab">
            <v-icon color="#646464">open_in_new</v-icon>
          </v-btn>
      </v-card-title>
      <no-ssr>
        <v-card-text class="pa-1" v-if="loaded">
          <apexchart :type="chartType" :height="chartHeight" :options="options" :series="data"></apexchart>
        </v-card-text>
        <v-layout row wrap fill-height justify-center align-center v-else>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-layout>
      </no-ssr>
    </v-card>
  </v-layout>
</template>
<script>
import { formatNumber, dateFormatter, groupData, removeDuplicate } from '../../utils/formatter'
export default {
  components: {apexchart: () => import('vue-apexcharts')},
  layout: 'embed',
  head(){
    return {
      title: getTitle(this.$route.params.name.split(',')),
      meta: [
        { title: getTitle(this.$route.params.name.split(',')), rel: 'alternate', type: 'application/json+oembed', href: '/api/oembed?url=' + this.$route.fullPath }
      ]
    }
  },
  data () {
    return {
      data: [],
      chartType: 'area',
      packages: [],
      loaded: false,
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
          categories: [],
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
  methods: {
    openInNewTab () {
      let url = window.location.href
      let regex = /\A?&type=[^&]+&*/g
      let delQuery = url.replace(regex, '')
      let finalUrl = delQuery.replace(/embed/, 'package')
      window.open(finalUrl)
    },
    pushData (data, type) {
      this.data.push({
        name: data.package,
        data: groupData(data.downloads, type)
      })
      this.options.xaxis.categories = data.downloads.map(e => dateFormatter(e.day, type)).reduce(removeDuplicate, [])
    }
  },
  computed: {
    chartHeight () {
      return (window.innerHeight - 75).toString() + 'px'
    }
  },
  async mounted () {
    let q = this.$route.query
    let type = q.type ? q.type : 'day'
    this.options.xaxis.type = q.type == 'week' ? 'categories' : 'datetime'
    let range = q.range ? q.range.replace(/_/g, ':') : 'last-month'
    let routeName = this.$route.params.name
    let name = routeName.split(',').length > 3 ? routeName.split(',').splice(0, 3).join(',') : routeName
      let response = await this.$axios.get(`https://api.npmjs.org/downloads/range/${range}/${name}`)
      let data = response.data
      this.packages = name.split(',')
      if (name.split(',').length > 1) {
        for (let key in data) {
          this.pushData(data[key], type)
        }
      } else {
        this.pushData(data, type)
      }
      let a = type === 'day' ? 'beauty' : type
      let day = this.data[0].data.map(e => e.day)
      let title = [day[0], day[day.length - 1]]
      this.options.title.text = title.map(e => dateFormatter(e, a)).reduce(removeDuplicate, []).join(' - ')
      this.chartType = this.data[0].data.length > 1 ? 'area' : 'bar'
      this.loaded = true
  }
}

</script>
<style>
.apexcharts-title-text {
  font-weight: 500;
  font-family: Roboto !important;
  font-size: 15px;
  text-transform: capitalize;
}

</style>
