<template>
  <v-sheet class="sparkline-card">
    <v-sparkline fill width="600" height="100" padding="7" smooth="17" :value="data" color="#03a9f49c"></v-sparkline>
  </v-sheet>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}

</script>
