/**
 * Application entrypoint
 * 
 * Initializes state, i18n & bootstraps the root component (ui/App.vue)
 */

import { createApp } from 'vue'

// @ts-ignore
import App from '@/view/App.vue'
import initI18n from "@/i18n/index";
import { OsmConnection } from '@/model/OsmConnection';
import { initState } from "@/state/index";
import { QueryParameters } from '@/model/QueryParameters';


const state = initState()
const i18n = initI18n()


// const osmConnection = new OsmConnection(
//     state.osm.userDetails,
//     state.osm.preferences,
//     Boolean(QueryParameters.getQueryParameter("test").value)
// );

// i18n.global.locale.value = osmConnection.getPreference("language").value
// osmConnection.getPreference("language").value = i18n.global.locale.value

const app = createApp(App)
app.use(i18n)
app.mount("#app")
