import {Tag, TagsFilter} from "../Logic/TagsFilter";
import {UIElement} from "../UI/UIElement";
import {Basemap} from "../Logic/Basemap";
import {ElementStorage} from "../Logic/ElementStorage";
import {UIEventSource} from "../UI/UIEventSource";
import {FilteredLayer} from "../Logic/FilteredLayer";
import {Changes} from "../Logic/Changes";
import {UserDetails} from "../Logic/OsmConnection";
import {TagRenderingOptions} from "./TagRendering";
import {TagDependantUIElementConstructor} from "./UIElementConstructor";

export class LayerDefinition {


    /**
     * This name is shown in the 'add XXX button'
     */
    name: string;
    /**
     * These tags are added whenever a new point is added by the user on the map.
     * This is the ideal place to add extra info, such as "fixme=added by MapComplete, geometry should be checked"
     */
    newElementTags: Tag[]
    /**
     * Not really used anymore
     * This is meant to serve as icon in the buttons
     */
    icon: string;
    /**
     * Only show this layer starting at this zoom level
     */
    minzoom: number;

    /**
     * This tagfilter is used to query overpass.
     * Examples are:
     * 
     * new Tag("amenity","drinking_water")
     * 
     * or a query for bicycle pumps which have two tagging schemes:
     * new Or([ 
     *  new Tag("service:bicycle:pump","yes") ,
     *  new And([
     *      new Tag("amenity","compressed_air"), 
     *      new Tag("bicycle","yes")])
     *  ])
     */
    overpassFilter: TagsFilter;

    /**
     * This UIElement is rendered as title element in the popup
     */
    title: TagRenderingOptions;
    /**
     * These are the questions/shown attributes in the popup
     */
    elementsToShow: TagDependantUIElementConstructor[];

    style: (tags: any) => { color: string, icon: any };

    /**
     * If an object of the next layer is contained for this many percent in this feature, it is eaten and not shown
     */
    maxAllowedOverlapPercentage: number = undefined;


    asLayer(basemap: Basemap, allElements: ElementStorage, changes: Changes, userDetails: UIEventSource<UserDetails>, selectedElement: UIEventSource<any>,
            showOnPopup: (tags: UIEventSource<(any)>) => UIElement):
        FilteredLayer {
        return new FilteredLayer(
            this.name,
            basemap, allElements, changes,
            this.overpassFilter,
            this.maxAllowedOverlapPercentage,
            this.style,
            selectedElement,
            showOnPopup);

    }

}