import {TagRenderingConfigJson} from "./TagRenderingConfigJson";
import {AndOrTagConfigJson} from "./TagConfigJson";

/**
 * Configuration for a single layer
 */
export interface LayerConfigJson {
    /**
     * The id of this layer.
     * This should be a simple, lowercase, human readable string that is used to identify the layer.
     */
    id: string;
    
    /**
     * The name of this layer
     * Used in the layer control panel and the 'Personal theme'
     */
    name: string | any

    /**
     * A description for this layer.
     * Shown in the layer selections and in the personal theme
     */
    description?: string | any;


    /**
     * The tags to load from overpass. Either a simple 'key=value'-string, otherwise an advanced configuration
     */
    overpassTags: AndOrTagConfigJson | string;

    /**
     * The zoomlevel at which point the data is shown and loaded.
     */
    minzoom: number;

    
    
    /**
     * The title shown in a popup for elements of this layer.
     */
    title: string | TagRenderingConfigJson;
    
    titleIcons?: (string | TagRenderingConfigJson)[];

    /**
     * The icon for an element.
     * Note that this also doubles as the icon for this layer (rendered with the overpass-tags) ánd the icon in the presets.
     */
    icon?: string | TagRenderingConfigJson;

    /**
     * A string containing "width,height" or "width,height,anchorpoint" where anchorpoint is any of 'center', 'top', 'bottom', 'left', 'right', 'bottomleft','topright', ... 
     * Default is '40,40,center'
     */
    iconSize?: string | TagRenderingConfigJson;
    
    /**
     * The color for way-elements
     */
    color?: string | TagRenderingConfigJson;
    /**
     * The stroke-width for way-elements
     */
    width?: string | TagRenderingConfigJson;

    /**
     * A dasharray, e.g. "5 6"
     * The dasharray defines 'pixels of line, pixels of gap, pixels of line, pixels of gap',
     * Default value: "" (empty string == full line)
     */
    dashArray?: string | TagRenderingConfigJson

    /**
     * Wayhandling: should a way/area be displayed as:
     * 0) The way itself
     * 1) The centerpoint and the way
     * 2) Only the centerpoint
     */
    wayHandling?: number;

    /**
     * Consider that we want to show 'Nature Reserves' and 'Forests'. Now, ofter, there are pieces of forest mapped _in_ the nature reserve.
     * Now, showing those pieces of forest overlapping with the nature reserve truly clutters the map and is very user-unfriendly.
     * 
     * The features are placed layer by layer. If a feature below a feature on this layer overlaps for more then 'x'-percent, the underlying feature is hidden.
     */
    hideUnderlayingFeaturesMinPercentage?:number;

    /**
     * Presets for this layer
     */
    presets?: {
        title: string | any,
        tags: string[],
        description?: string | any,
    }[],

    /**
     * All the tag renderings.
     */
    tagRenderings?: (string | TagRenderingConfigJson) []
}