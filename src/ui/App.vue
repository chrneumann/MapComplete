<template>
  <div id="app">
    <div class="map-cont">
      <input class="free-input" v-model="freeInput" type="text">
      <div class="map" ref="map"></div>
    </div>
    <div class="side-cont">
      <LayerToggle :layers="jfdash">
      </LayerToggle>
      <MapView :layers="jfdash">
      </MapView>
      <ul class="coord-format-list">
        <li>
          <h3>is valid:</h3>
          <p>{{ isvalid }}</p>
        </li>
        <li>
          <h3>olc:</h3>
          <p>{{ olc }}</p>
        </li>
        <li>
          <h3>gh:</h3>
          <p>{{ gh }}</p>
        </li>
        <li>
          <h3>qth:</h3>
          <p>{{ qth }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { Vue, Options } from 'vue-class-component'

import { map, tileLayer, marker, icon, latLng, LatLng } from "leaflet";
require("leaflet_css");

@Options({
  name: 'App',
  components: {
  },
  watch: {
    freeInput: function (freeInput, _) {

    }
  }
})
export default class App extends Vue {
  private freeInput = null
  private latlng = new LatLng(50.881264, 4.715634)

  mounted() {
    this.$nextTick(() => {
      // I'm the setup function, do leaflet stuff here
    });
  }

  get imAComputedProperty() {
    return Math.floor(Math.random() * 10)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
</style>
