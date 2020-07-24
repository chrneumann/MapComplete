<template>
  <div ref="leafletMap"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from "vue"
import { Map, TileLayer, LatLng } from "leaflet"
import "leaflet_css"

export default defineComponent({
  setup() {
    const leafletMap: Ref<HTMLDivElement> = ref(null);

    onMounted(() => {
      nextTick(() => {
        const myMap = new Map(leafletMap.value)

        myMap.setView(new LatLng(0, 0), 2);

        new TileLayer('https://api.maptiler.com/maps/pastel/{z}/{x}/{y}.png?key=hzPTkHaOajQq34V8m9jS', {
          maxZoom: 19,
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(myMap);
      });
    })

    return {
      leafletMap 
    }
  }
});
</script>

<style>

</style>
