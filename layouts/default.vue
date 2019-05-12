<template>
  <v-app>
    <Menu></Menu>
    <v-content>
      <v-layout align-center justify-center row wrap fill-height>
        <Search></Search>
        <nuxt></nuxt>
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import Search from '../components/search'
import Menu from '../components/menu'
export default {
  name: 'App',
  components: { Menu, Search }
}
</script>
<style>
html, body{
  height: 100%;
}
.capitalize{
  text-transform: capitalize;
}
.cfc{
  color: #606060 !important;
}
.br5{
  border-radius: 5px !important;
}
.bb {
  border-bottom: 1px solid #f2f2f2;
}
.br {
  border-right: 1px solid #f2f2f2;
}
.bl {
  border-left: 1px solid #f2f2f2;
}
</style>
