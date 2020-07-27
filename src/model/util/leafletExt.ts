import { LatLng } from "leaflet";

/**
 * Updates a LatLng object with new data using reactive setters
 * 
 * @param latLng the existing (reactive) LatLng object
 * @param newLatLng a LatLng object containing new 
 * information (coming from leaflet for example)
 */
export function updateLatLng(latLng: LatLng, newLatLng: LatLng) {
    latLng.lat = newLatLng.lat
    latLng.lng = newLatLng.lng
}
