<template>
  <span id='welcomeMessage'>
    <span>{{ t(layout.welcomeMessage) }}</span>
    <span v-if="userDetails.loggedIn">{{ layout.welcomeBackMessage }}</span>
    <span v-else>{{ layout.gettingStartedPlzLogin }}</span>
    <span>{{ layout.welcomeTail }}</span>
</span>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"
import SlippyMap from './SlippyMap.vue'
import UserBadge from "./components/UserBadge.vue";
import { Layout } from "../../layout/Layout";
import { state } from "../../state";


export default defineComponent({
  props: {
    layout: {
      type: Layout,
      required: true
    }
  },
  setup(props) {
    return {
      ...useI18n(),
      layout: props.layout,
      userDetails: state.osm.userDetails
    }
  },
  components: {
    SlippyMap,
    UserBadge
  }
});
</script>

<style>

</style>
