import { reactive, watch } from "vue"
import { LatLng } from "leaflet"
import { Layout } from "@/layouts/Layout"
import { QueryParameters } from "@/model/QueryParameters"
import { asFloat } from "@/model/util"


const LATLNG_FRACTION_DIGITS = 5 // https://xkcd.com/2170/ (probably too precise)

/**
 * Determine the mapLocation on app start.
 * @param layout
 */
export default function initialLocation(layout: Layout) {
    const zoom = QueryParameters.getQueryParameter("z")
    const lat = QueryParameters.getQueryParameter("lat")
    const lon = QueryParameters.getQueryParameter("lon")
    const mapLocation = reactive({
      zoom: asFloat(zoom.value) | layout.startzoom,
      latLng: new LatLng(
        asFloat(lat.value) | layout.startLat,
        asFloat(lon.value) | layout.startLon
      )
    })

    watch(mapLocation, newMapLocation => {
        zoom.value = newMapLocation.zoom.toString()
        lat.value = newMapLocation.latLng.lat.toFixed(LATLNG_FRACTION_DIGITS)
        lon.value = newMapLocation.latLng.lng.toFixed(LATLNG_FRACTION_DIGITS)
    }, {
        deep: true
    })

    return mapLocation
}
