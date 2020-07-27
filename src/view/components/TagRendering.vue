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
import { TagRenderingOptions } from "../../layout/TagRenderingOptions";
import { Changes } from "../../model/Changes";
import { OsmObject, OsmNode, OsmWay, OsmRelation } from "../../model/OsmObject";


export default defineComponent({
  props: {
    options: {
      type: TagRenderingOptions,
      required: true
    },
    changes: {
      type: Changes,
      required: true
    },
    // osmObject: {
    //   required: true,
    //   validator: (prop) => prop instanceof OsmObject
    // }
  },
  setup(props) {
    const options = props.options
    const changes = props.changes
    const osmObject = props.osmObjects

    return {
      ...useI18n(),
      options
    }
  }
});
</script>

<style>

</style>
