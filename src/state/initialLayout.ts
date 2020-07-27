import { AllKnownLayouts } from "@/layouts/AllKnownLayouts";
import { QueryParameters } from "@/model/QueryParameters";


/**
 * Determine the layout to show on app start.
 * 
 * @param defaultLayout Layout name in AllKnownLayouts if no other layout is matched in the url
 */
export default function initialLayout(defaultLayout: string) {
    // Run over all questsets. If a part of the URL matches a searched-for part in the layout, it'll take that as the default
    for (const k in AllKnownLayouts.allSets) {
        const layout = AllKnownLayouts.allSets[k];
        const possibleParts = layout.locationContains ?? [];
        for (const locationMatch of possibleParts) {
            if (locationMatch === "") {
                continue
            }
            if (window.location.href.toLowerCase().indexOf(locationMatch.toLowerCase()) >= 0) {
                defaultLayout = layout.name;
            }
        }
    }

    defaultLayout = QueryParameters.getQueryParameter("layout").value ?? defaultLayout;

    return AllKnownLayouts.allSets[defaultLayout] ?? AllKnownLayouts["all"];
}
