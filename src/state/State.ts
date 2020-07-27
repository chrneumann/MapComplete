import { UserDetails } from "@/model/OsmConnection"
import { StringMap } from "@/types"
import { Map, LatLng } from "leaflet"
import MapLocation from "@/model/MapLocation"
import { LayerDefinition } from "@/model/BaseLayers"
import { reactive } from "vue"


export default interface State {
    osm: {
        userDetails: UserDetails,
        preferences: StringMap
    },    
    map: {
        leafletInst: Map,
        location: MapLocation,
        currentLayer: LayerDefinition,
        lastClickLocation: LatLng
    }
}

export function createState(): State {
    console.log('Creating global state')
    const state: State = {
      osm: {
        userDetails: null,
        preferences: null
      },
      map: {
        leafletInst: null,
        location: null,
        currentLayer: null,
        lastClickLocation: null
      }
    }
    return reactive(state) as State
}
