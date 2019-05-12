<template>
  <v-card height="220px" class="home-card" color="white" flat>
    <sparkline :data="data.slice(0, 4)"></sparkline>
    <v-card-text class="fill-height">
      <v-layout row wrap justify-center mt-2>
        <v-flex md4 xs4 mt-1>
          <v-img class="mx-auto" width="42px" v-if="isUrl" :src="logo"></v-img>
          <p v-else style="font-size: 30px; text-align: center">📦</p>
        </v-flex>
        <v-flex md8 xs7 bl>
          <p class="headline capitalize font-weight-medium mb-1">{{name}}</p>
          <span class="subheading font-weight-medium ma-0">
            {{data | sum}}
          </span>
          <span>Downloads</span>
          <p class="mt-2 cfc">{{date | beautyDate}}</p>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
import Sparkline from '../components/sparkline'
export default {
  components: { sparkline: Sparkline },
  props: {
    date: {
      type: String,
      default: 'last-week'
    },
    data: {
      type: Array,
      default: () => { return [1, 3, 4, 7, 9] }
    },
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'Package'
    }
  },
  computed: {
    isUrl () {
      let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g
      return regex.test(this.$props.logo)
    }
  }
}

</script>
