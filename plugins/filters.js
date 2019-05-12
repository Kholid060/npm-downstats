import Vue from 'vue'

Vue.filter('sum', (value) => {
  if (value.length > 1) {
    return value.reduce((partial_sum, a) => partial_sum + a).toLocaleString()
  } else {
    return ''
  }
})

Vue.filter('beautyDate', (date) => {
  let a = date.split(':')
  if (a.length > 1) {
    let beauty = a.map(e => moment(e).format('MMMM Do YYYY'))
    return beauty.join(' - ')
  } else {
    return a[0].replace(/-/g, ' ')
  }
})