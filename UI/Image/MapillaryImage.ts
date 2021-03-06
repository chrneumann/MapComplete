import {UIElement} from "../UIElement";
import {UIEventSource} from "../../Logic/UIEventSource";
import {LicenseInfo} from "../../Logic/Web/Wikimedia";
import {Imgur} from "../../Logic/Web/Imgur";
import {Mapillary} from "../../Logic/Web/Mapillary";
import {Img} from "../Img";
import {FixedUiElement} from "../Base/FixedUiElement";
import Svg from "../../Svg";


export class MapillaryImage extends UIElement {

    /***
     * Dictionary from url to alreayd known license info
     */
    private static allLicenseInfos: any = {};
    private readonly _imageMeta: UIEventSource<LicenseInfo>;
    private readonly _imageLocation: string;

    constructor(source: string) {
        super()
        
        if(source.toLowerCase().startsWith("https://www.mapillary.com/map/im/")){
            source = source.substring("https://www.mapillary.com/map/im/".length);
        }
        
        this._imageLocation = source;
        if (MapillaryImage.allLicenseInfos[source] !== undefined) {
            this._imageMeta = MapillaryImage.allLicenseInfos[source];
        } else {
            this._imageMeta = new UIEventSource<LicenseInfo>(null);
            MapillaryImage.allLicenseInfos[source] = this._imageMeta;
            const self = this;
            Mapillary.getDescriptionOfImage(source, (license) => {
                self._imageMeta.setData(license)
            })
        }

        this.ListenTo(this._imageMeta);

    }

    InnerRender(): string {
        const url = `https://images.mapillary.com/${this._imageLocation}/thumb-640.jpg?client_id=TXhLaWthQ1d4RUg0czVxaTVoRjFJZzowNDczNjUzNmIyNTQyYzI2`;
        const image = `<img src='${url}'>`;

        if (this._imageMeta === undefined || this._imageMeta.data === null) {
            return image;
        }

        const attribution =
            "<span class='attribution-author'><b>" + (this._imageMeta.data.artist ?? "") + "</b></span>" + " <span class='license'>" + (this._imageMeta.data.licenseShortName ?? "") + "</span>";

        return "<div class='imgWithAttr'>" +
            image +
            "<div class='attribution'>" +
            Svg.mapillary_ui().Render() +
            attribution +
            "</div>" +
            "</div>";
    }


}