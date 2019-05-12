<template>
  <v-container fluid grid-list-xl pt-0>
    <div class="error-wrapper" v-if="error">
      {{errorData}}
    </div>
    <div class="content" v-else>
      <v-layout row wrap v-if="loaded">
        <v-flex md12>
          <embed-button></embed-button>
          <v-container grid-list-xl pt-0>
            <v-layout row wrap justify-center align-center style="height: 300px">
              <v-flex md3 v-for="data in data.day.charts" :key="data.name" @click="npmLink(data.name)">
                <package-card :data="data.data" :date="range" :name="data.name"></package-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex md12>
          <chart title="Downloads per day" :data="data.day.charts" height="440px" :labels="data.day.labels"></chart>
        </v-flex>
        <v-flex md12>
          <chart title="Downloads per week" :data="data.week.charts" :labels="data.week.labels"></chart>
        </v-flex>
        <v-flex md7>
          <chart title="Downloads per month" :data="data.month.charts" :labels="data.month.labels"></chart>
        </v-flex>
        <v-flex md5>
          <chart type="bar" title="downloads per year" :data="data.year.charts" :labels="data.year.labels"></chart>
        </v-flex>
      </v-layout>
      <v-layout v-else fill-height justify-center>
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </div>
  </v-container>
</template>
<script>
import PackageCard from '../../components/package-card.vue'
import moment from 'moment'
import { groupData, removeDuplicate, dateFormatter } from '../../utils/formatter'
import Bus from '../../utils/bus'
import EmbedButton from '../../components/embed-button.vue'
const getTitle = require('../../utils/getTitle')
export default {
  components: {
    'package-card': PackageCard,
    'embed-button': EmbedButton,
    'chart': () => import('../../components/chart')
  },
  data: () => ({
    loaded: false,
    error: false,
    errorData: null,
    range: null,
    oembedLink: '',
    data: {
      year: {
        labels: [],
        charts: []
      },
      month: {
        labels: [],
        charts: []
      },
      week: {
        labels: [],
        charts: []
      },
      day: {
        labels: [],
        charts: []
      }
    }
  }),
  methods: {
    npmLink (e) {
      window.open(`https://www.npmjs.com/package/${e}`)
    },
    pushData (data, type) {
      this.data[type].charts.push({
        name: data.package,
        data: groupData(data.downloads, type)
      })
      this.data[type].labels = data.downloads.map(e => dateFormatter(e.day, type)).reduce(removeDuplicate, [])
    },
    fetchData (e) {
      this.loaded = false
      this.data = {
        year: {
          labels: [],
          charts: []
        },
        month: {
          labels: [],
          charts: []
        },
        week: {
          labels: [],
          charts: []
        },
        day: {
          labels: [],
          charts: []
        }
      }
      return this.$axios.get(`https://api.npmjs.org/downloads/range/${e.range}/${e.name}`).then(response => {
        let data = response.data
        if (e.name.split(',').length == 1) {
          this.pushData(data, 'day')
          this.pushData(data, 'week')
          this.pushData(data, 'month')
          this.pushData(data, 'year')
        } else {
          for (let key in data) {
            this.pushData(data[key], 'day')
            this.pushData(data[key], 'week')
            this.pushData(data[key], 'month')
            this.pushData(data[key], 'year')
          }
        }
        let range = e.range.replace(/:/g, '_')
        this.$router.replace({ path: `/package/${e.name}`, query: { range: range } })
        this.loaded = true
      }).catch(e => {
        this.error = true
        this.errorData = e
        console.log(this.errorData)
      })
    }
  },
  created () {
    Bus.listen('fetchData', this.fetchData)
  },
  async mounted () {
    this.oembedLink = `${window.location.origin}/api/oembed?url=${window.location.href}`
    console.log(this.$route, this.$router)
    try {
      let routeName = this.$route.params.name
      let range = this.$route.query.range ? this.$route.query.range.replace(/_/g, ':') : 'last-month'
      this.range = range
      let name = routeName.split(',').length > 3 ? routeName.split(',').splice(0, 3).join(',') : routeName
      await this.fetchData({ name, range })
    } catch (e) {
      this.error = true
      this.errorData = e
      console.log(this.errorData)
    }
  }
}

</script>
