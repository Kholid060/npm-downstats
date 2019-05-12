<template>
  <div class="text-xs-center">
    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn class="embed-button" absolute v-on="on" flat color="primary" round>
          <span class="capitalize mr-2">embed</span>
          <v-icon class="pa-0 ma-0">code</v-icon>
        </v-btn>
      </template>
      <v-card width="350px" class="br5">
        <v-card-text>
          <v-text-field append-icon="content_copy" outline label="embed link" class="custom-form-embed" hide-details readonly :value="embedLink" @click:append="copyToClipboard"></v-text-field>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  methods: {
    copyToClipboard () {
      let el = document.querySelector('.custom-form-embed input')
      el.select()
      document.execCommand('copy')
    }
  },
  computed: {
    embedLink () {
      return window.location.href.replace(/package/, 'embed')
    }
  }
}

</script>
<style>
.embed-button {
  right: 10%;
}

.custom-form-embed .v-input__control .v-input__slot {
  border: none !important;
  border-radius: 5px !important;
  background-color: #f4f4f4 !important;
}

</style>
