<template>
  <v-container pb-0 ma-0 grid-list-xl style="height: 260px">
    <v-layout row wrap fill-height align-center justify-center>
      <v-flex md12>
        <div align="center">
          <v-btn-toggle mandatory v-model="mode" class="mode-select">
            <v-btn flat value="find">find</v-btn>
            <v-btn flat value="compare">compare</v-btn>
          </v-btn-toggle>
        </div>
      </v-flex>
      <v-flex md1>
        <v-btn class="right" large icon @click="expand = !expand">
          <v-icon :color="expand ? 'primary' : '#707070'">settings</v-icon>
        </v-btn>
      </v-flex>
      <v-flex md6 xs12 pa-0>
        <v-slide-y-reverse-transition mode="out-in">
          <v-text-field @keyup.enter="search" v-if="mode == 'find'" class="search-form" solo flat height="60px" hide-details background-color="white" label="search package" v-model="listPackages[0]"></v-text-field>
          <v-combobox v-else v-model="listPackages" label="press 'enter' to add package" multiple solo height="60px" class="search-form" flat append-icon="" hide-details chips>
          </v-combobox>
        </v-slide-y-reverse-transition>
      </v-flex>
      <v-flex md2 xs12 pa-0>
        <v-btn large color="primary" depressed class="pa-0 search-button" @click="search">
          <span>{{buttonText}}</span>
          <v-icon class="ma-0 ml-2 pa-0">search</v-icon>
        </v-btn>
      </v-flex>
      <v-expand-transition>
        <v-flex md6 v-show="expand" pa-0>
          <div class="expand-setting mt-3" align="center">
            <v-layout row wrap>
              <v-flex md2>
                <v-switch label="range" color="primary" v-model="range"></v-switch>
              </v-flex>
              <v-flex md10>
                <date-picker @date="changeDate" :disabled="!range"></date-picker>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-expand-transition>
    </v-layout>
    <v-snackbar v-model="snackbar.active" top right :color="snackbar.color">
      <span class="capitalize">{{ snackbar.text }}</span>
      <v-btn flat @click="snackbar.active = false" icon small>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import DatePicker from '../components/date-picker'
import Bus from '../utils/bus'
export default {
  components: { 'date-picker': DatePicker },
  data: () => ({
    snackbar: {
      active: false,
      text: '',
      color: 'error'
    },
    range: false,
    expand: false,
    mode: 'find',
    listPackages: [],
    date: {
      from: new Date(Date.now() - 2592000000).toISOString().substr(0, 10),
      to: new Date().toISOString().substr(0, 10)
    }
  }),
  computed: {
    buttonText () {
      return this.mode == 'find' ? 'search' : 'compare'
    }
  },
  methods: {
    changeDate (e) {
      this.date = e
    },
    search () {
      this.expand = false
      if (this.listPackages.length == 0) {
        this.snackbar.active = true
        this.snackbar.text = 'enter package name first'
      } else {
        let name = this.listPackages.join(',')
        let rangeRoute = `${this.date.from}_${this.date.to}`
        if (this.$route.name == 'package') {
          let range = rangeRoute.replace(/_/g, ':')
          Bus.fire('fetchData', { name, range })
        } else {
          this.range ? this.$router.push({ path: `/package/${name}`, query: { range: rangeRoute } }) : this.$router.push({ path: `/package/${name}` })
        }
      }
    }
  },
  mounted () {
    let nameParam = this.$route.params.name
    nameParam ? this.listPackages = nameParam.split(',') : null
  },
  watch: {
    listPackages (val) {
      if (val.length > 3) {
        this.$nextTick(() => this.listPackages.pop())
      }
    }
  }
}

</script>
