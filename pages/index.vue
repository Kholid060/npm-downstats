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
      title: 'Find or Compare NPM Package Download Statistic'
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
        console.log(tempData)
        tempData = {}
      }
  }
}

</script>
<style>
@keyframes slideIn {
  0% {
    transform: translateY(30px);
    opacity: 0
  }

  100% {
    transform: translateY(0);
    opacity: 100
  }
}

.home-card {
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
  overflow: hidden;
  animation: .5s ease-out 0s 1 slideIn;
}

.home-card:hover {
  box-shadow: none !important;
}

.mode-select .v-btn--active {
  background-color: #03a9f4;
  color: white !important;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}

.mode-select {
  box-shadow: none;
  border-radius: 5px !important;
}

.mode-select button:first-child {
  border-radius: 5px 0 0 5px !important;
}

.mode-select button:last-child {
  border-radius: 0 5px 5px 0 !important;
}

.mode-select button {
  width: 100px !important;
  height: 45px;
}

.search-button {
  height: 56px;
  width: 140px !important;
  border-radius: 5px;
}

.search-form .v-input__control .v-input__slot {
  border: 1px solid #d5d5d5 !important;
  border-radius: 5px !important;
  transition: all .5s ease;
}

.search-form .v-input__control .v-input__slot:hover {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}

</style>
