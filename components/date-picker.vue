<template>
  <v-container ma-0 pa-0 grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-flex md6>
        <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field :disabled="disabled" :value="fromDate" label="From" prepend-inner-icon="event" hide-details readonly box v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="range.from" @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex md6>
        <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field :disabled="disabled" :value="toDate" label="To" prepend-inner-icon="event" hide-details readonly box v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="range.to" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    date: {
      type: Object,
      default: () => {
        return {
          from: null,
          to: new Date().toISOString().substr(0, 10)
        }
      }
    }
  },
  data () {
    return {
      range: this.date,
      menu1: false,
      menu2: false
    }
  },
  computed: {
    fromDate () {
      return this.range.from ? moment(this.range.from).format('MMMM Do YYYY') : ''
    },
    toDate () {
      return this.range.to ? moment(this.range.to).format('MMMM Do YYYY') : ''
    }
  },
  watch: {
    range: {
      handler (val) {
        this.$emit('date', val)
      },
      deep: true
    }
  }
}

</script>
<style>
.date-picker-form {
  max-width: 20%;
}

.swith-range {
  max-width: 10% !important;
}

</style>
