<template>
  <div v-if="!userDetails.loggedIn" class='activate-osm-authentication'>
    {{ t('general.loginWithOpenStreetMap') }}
  </div>
  <div v-else id='userstats'>
    <img v-if="userDetails.home" v-on:click="flyHome()" id='home' src='./assets/home.svg' alt='home' class='small-userbadge-icon'>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"
import { state } from "@/state/index";


function flyHome() {
  const home = state.osm.userDetails.home
  if (home === undefined) {
    return
  }
  state.map.leafletInst.flyTo([home.lat, home.lon], 18)
}

export default defineComponent({
  setup() {
    const userDetails = state.osm.userDetails

    return {
      ...useI18n(),
      userDetails,
      flyHome
    }
  }
})
</script>

<style lang="sass" scoped>
@import "styles/components"

.button {
  @use pill
}


</style>
