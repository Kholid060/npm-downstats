<template>
  <v-layout fill-height>
    <v-card width="100%" flat>
      <v-card-title class="py-2">
        <span class="capitalize subheading font-weight-medium">
          {{cardTitle}}
        </span>
        <v-spacer></v-spacer>
        <v-btn icon class="ma-0 pa-0" @click="openInNewTab">
          <v-icon color="#646464">open_in_new</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-1" v-if="loaded">
        <apexchart ref="chart" :type="chartType" :height="chartHeight" :options="options" :series="data"></apexchart>
      </v-card-text>
      <v-layout row wrap fill-height justify-center align-center v-else>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-card>
  </v-layout>
</template>
<script>
import { formatNumber, dateFormatter, groupData, removeDuplicate } from '../../utils/formatter'
const getTitle = require('../../utils/getTitle')
const arrayToSentence = require('../../utils/arrayToSentence')
export default {
  components: { apexchart: () => import('vue-apexcharts') },
  layout: 'embed',
  head() {
    return {
      title: getTitle(this.$route.params.name.split(',')),
      meta: [
        { title: getTitle(this.$route.params.name.split(',')), rel: 'alternate', type: 'application/json+oembed', href: `${this.domain}/api/oembed?url=${this.domain}${this.$route.fullPath};format=json` },
        { name: 'og:title', content: getTitle(this.$route.params.name.split(',')) },
        { name: 'og:image', content: this.dataURI._value }
      ]
    }
  },
  data() {
    return {
      data: [],
      dataURI: {
        _value: ''
      },
      domain: 'https://packstats.herokuapp.com',
      typeData: 'day',
      chartType: 'area',
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
        subtitle: {
          text: ''
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
    openInNewTab() {
      let url = window.location.href
      let regex = /\A?&type=[^&]+&*/g
      let delQuery = url.replace(regex, '')
      let finalUrl = delQuery.replace(/embed/, 'package')
      window.open(finalUrl)
    },
    pushData(data, type) {
      this.data.push({
        name: data.package,
        data: groupData(data.downloads, type)
      })
      this.options.xaxis.categories = data.downloads.map(e => dateFormatter(e.day, type)).reduce(removeDuplicate, [])
    },
    subtitle(data, a){
      let packName = data.package.toUpperCase()
      let numReduce = formatNumber(groupData(data.downloads, 'year'))
      let xyz = packName + ': ' + numReduce
      a.push(xyz)
    }
  },
  computed: {
    cardTitle(){
      return arrayToSentence(this.$route.params.name.split(',')) + ' Download Statistic'
    },
    chartHeight() {
      return (window.innerHeight - 75).toString() + 'px'
    }
  },
  async mounted() {
    let q = this.$route.query
    let type = q.type ? q.type : 'day'
    this.options.xaxis.type = q.type == 'week' ? 'categories' : 'datetime'
    let range = q.range ? q.range.replace(/_/g, ':') : 'last-month'
    let routeName = this.$route.params.name
    let name = routeName.split(',').length > 3 ? routeName.split(',').splice(0, 3).join(',') : routeName
    let response = await this.$axios.get(`https://api.npmjs.org/downloads/range/${range}/${name}`)
    let data = response.data
    let subtitle = []
    if (name.split(',').length > 1) {
      for (let key in data) {
        this.pushData(data[key], type)
        this.subtitle(data[key], subtitle)
      }
    } else {
      this.pushData(data, type)
      this.subtitle(data, subtitle)
    }
    let a = type === 'day' ? 'beauty' : type
    let title = [data.start, data.end]
    this.options.subtitle.text = subtitle.join(', ')
    this.options.title.text = title.map(e => dateFormatter(e, a)).reduce(removeDuplicate, []).join(' - ')
    this.chartType = this.data[0].data.length > 1 ? 'area' : 'bar'
    this.loaded = true
    setTimeout(() => {
      this.$nextTick(() => this.dataURI = this.$refs.chart.dataURI())
    }, 1000)
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
