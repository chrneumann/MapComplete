<template>
  <div class='activate-osm-authentication'>Translations.t.general.loginWithOpenStreetMap.R()</div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  setup() {
    return {
      ...useI18n()
    }
  }
});
</script>

<style>

</style>
