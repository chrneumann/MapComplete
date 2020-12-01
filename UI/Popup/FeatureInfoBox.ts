import {UIElement} from "../UIElement";
import {UIEventSource} from "../../Logic/UIEventSource";
import LayerConfig from "../../Customizations/JSON/LayerConfig";
import EditableTagRendering from "./EditableTagRendering";
import QuestionBox from "./QuestionBox";
import Combine from "../Base/Combine";
import TagRenderingAnswer from "./TagRenderingAnswer";
import State from "../../State";
import {FixedUiElement} from "../Base/FixedUiElement";

export class FeatureInfoBox extends UIElement {
    private _tags: UIEventSource<any>;
    private _layerConfig: LayerConfig;

    private _title : UIElement;
    private _titleIcons: UIElement;
    private _renderings: UIElement[];
    private _questionBox : UIElement;

    constructor(
        tags: UIEventSource<any>,
        layerConfig: LayerConfig
    ) {
        super();
        if (layerConfig === undefined) {
            throw "Undefined layerconfig"
        }
        this._tags = tags;
        this._layerConfig = layerConfig;


        this._title = layerConfig.title === undefined ? undefined :
            new TagRenderingAnswer(tags, layerConfig.title)
                .SetClass("featureinfobox-title");
        this._titleIcons = new Combine(
            layerConfig.titleIcons.map(icon => new TagRenderingAnswer(tags, icon)))
            .SetClass("featureinfobox-icons");
        this._renderings = layerConfig.tagRenderings.map(tr => new EditableTagRendering(tags, tr));
        this._renderings[0]?.SetClass("first-rendering");
        if (State.state.featureSwitchUserbadge.data) {
            this._questionBox = new QuestionBox(tags, layerConfig.tagRenderings);
        }
    }

    InnerRender(): string {
        return new Combine([
            new Combine([this._title, this._titleIcons])
                .SetClass("featureinfobox-titlebar"),
            new Combine([
                    ...this._renderings,
                    this._questionBox,
                    new FixedUiElement("").SetClass("featureinfobox-tail")
                ]
            ).SetClass("featureinfobox-content"),
        ]).SetClass("featureinfobox")
            .Render();
    }


}
