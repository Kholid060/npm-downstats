<template>
  <v-container grid-list-xl ma-0 pt-0>
    <v-layout row column justify-center>
      <p style="text-align: center;" class="cfc font-weight-medium subheading mb-1">Build with: </p>
      <v-layout row wrap justify-center align-center>
        <v-flex md3 xs6 v-for="chart in chartData" :key="chart.package" @click="homeCard(chart.package)">
          <package-card :logo="packageLogo(chart.package)" :data="chart.downloads" :name="chart.package"></package-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import PackageCard from '../components/package-card.vue'
export default {
  components: { 'package-card': PackageCard },
  head(){
    return {
      title: 'PackStats - Find or Compare NPM Package Download Statistic'
    }
  },
  data: () => ({
    chartData: []
  }),
  methods: {
    homeCard (name) {
      this.$router.push({ path: `/package/${name}`, query: { range: 'last-week' } })
    },
    packageLogo (name) {
      switch (name) {
        case 'vue':
          return 'https://vuejs.org/images/logo.png'
          break
        case 'vuetify':
          return 'https://cdn.vuetifyjs.com/images/logos/v-alt.svg'
          break
        case 'apexcharts':
          return 'https://apexcharts.com/wp-content/themes/apexcharts/img/apexcharts-logo-trimmed.svg'
          break
      }
    }
  },
  async mounted () {
      let data = await this.$axios.$get('https://api.npmjs.org/downloads/range/last-week/vue,vuetify,apexcharts')
      for (const key in data) {
        let that = data[key]
        let tempData = {
          package: that.package,
          downloads: that.downloads.map(download => download.downloads),
          labels: that.downloads.map(download => download.day)
        }
        this.chartData.push(tempData)
        tempData = {}
      }
  }
}

</script>
