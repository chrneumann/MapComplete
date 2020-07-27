<template>
  <div>
    <div ref="eMap"></div>
    <teleport to="eAttribution">
      <a href='https://github.com/pietervdvn/MapComplete' target='_blank'>Mapcomple</a>
      <span> | </span>
      <a href='https://github.com/pietervdvn/MapComplete/issues' target='_blank'>
        <img src='./assets/bug.svg' alt='Report bug'  class='small-userbadge-icon'>
      </a>
      <div v-if="location">
        <span> | </span>
        <a :href="'https://www.openstreetmap.org/edit?editor=id#map=' + zLatLng" target='_blank'>
          <img src='./assets/pencil.svg' alt='edit here' class='small-userbadge-icon'>
        </a>
      </div>
      <span> | </span>
      <a href='https://osm.org'>OpenStreetMap</a>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick, watch, computed } from "vue"
import { Map, TileLayer, LatLng, Layer, LeafletMouseEvent } from "leaflet"
import "leaflet_css"
import BaseLayers from "../model/BaseLayers";
import { state } from "@/state";


export default defineComponent({
  setup() {
    const eAttribution: Ref<HTMLElement> = ref(null)
    const eMap: Ref<HTMLDivElement> = ref(null)

    onMounted(() => {
      nextTick(() => {
        // public 
        // public lastClickLocation: LatLng = undefined
        const previousLayer: Layer = undefined

        const map = new Map(
          eMap.value, {
          center: state.map.location.latLng,
          zoom: state.map.location.zoom,
          layers: [BaseLayers.defaultLayer.layer]
        })
        state.map.leafletInst = map

        map.zoomControl.setPosition("bottomright")
        map.on("moveend", () => {
          state.map.location.zoom = map.getZoom()
          state.map.location.latLng = map.getCenter()
        })

        watch(state.map.currentLayer, layerDef => {
          if (previousLayer !== undefined) {
            map.removeLayer(previousLayer)
          }

          // @ts-ignore TODO: Why???
          previousLayer = layerDef.layer
          // @ts-ignore
          map.addLayer(layerDef.layer)
        })

        map.on("click", (e: LeafletMouseEvent) => {
          state.map.lastClickLocation = e.latlng
        })

        eAttribution.value = map.attributionControl.getContainer()
      })
    })

    const zLatLng = computed(() => {
      const z = state.map.location.zoom
      const ll = state.map.location.latLng
      return [z, ll.lat, ll.lng].join("/")
    })

    return {
      eMap,
      location: state.map.location,
      zLatLng
    }
  }
});
</script>

<style>

</style>
