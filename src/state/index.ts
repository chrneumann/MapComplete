import { UserDetails } from '@/model/OsmConnection';
import { createState } from './State';
import initialLayout from './initialLayout';
import initialLocation from './initialLocation';


export const state = createState()

export function initState() {
  const layout = initialLayout("walkbybrussels")
  state.map.location = initialLocation(layout)
  state.osm.userDetails = new UserDetails()
  state.osm.preferences = {}
  return state
}
