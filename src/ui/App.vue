<template>
  <div class="app">
    {{ t('cyclofix.title', {}, { locale: 'en' }) }}
    <div id="topleft-tools">
      <div id="userbadge-and-search">
        <!-- <UserBadge></UserBadge> -->
      </div>
    </div>
    <SlippyMap class="map"></SlippyMap>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"
import SlippyMap from './SlippyMap.vue'

export default defineComponent({
  setup() {
    return {
      ...useI18n()
    }
  },
  components: {
    SlippyMap
  }
});

/*

import { Vue, Options } from 'vue-class-component'
import { map, tileLayer, marker, icon, latLng, LatLng } from "leaflet";
import { useI18n } from 'vue-i18n'
// require("leaflet_css");



@Options({
  components: {
    SlippyMap
  }
})
export default class App extends Vue {
  private freeInput = null
  private latlng = new LatLng(50.881264, 4.715634)

  mounted() {
    console.log('Mounted!')
    // this.$nextTick(() => {
    //   // I'm the setup function, do leaflet stuff here
    // });
  }

  get imAComputedProperty() {
    return Math.floor(Math.random() * 10)
  }
}
*/
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
}
</style>
