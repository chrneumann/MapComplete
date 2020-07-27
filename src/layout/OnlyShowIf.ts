/**
 * Wrapper around another TagDependandElement, which only shows if the filters match
 */
import {TagDependantUIElement, TagDependantUIElementConstructor} from "./UIElementConstructor";
import {TagsFilter, TagUtils} from "../Logic/TagsFilter";
import {UIElement} from "../UI/UIElement";
import {UIEventSource} from "../UI/UIEventSource";
import {Changes} from "../Logic/Changes";
import { OnlyShowIfConstructor } from "./OnlyShowIfConstructor";




class OnlyShowIf extends UIElement implements TagDependantUIElement {
    private _embedded: TagDependantUIElement;
    private _filter: TagsFilter;

    // TODO: Move this
    public static fromConstuctor(constructor: OnlyShowIfConstructor, dependencies): TagDependantUIElement {
        return new OnlyShowIf(dependencies.tags,  constructor.embedded.construct(dependencies), this._tagsFilter);
    }

    constructor(
        tags: UIEventSource<any>,
        embedded: TagDependantUIElement, filter: TagsFilter) {
        super(tags);
        this._filter = filter;
        this._embedded = embedded;

    }
    
    private Matches() : boolean{
        return this._filter.matches(TagUtils.proprtiesToKV(this._source.data));
    } 

    protected InnerRender(): string {
        if (this.Matches()) {
            return this._embedded.Render();
        } else {
            return "";
        }
    }

    priority(): number {
        return this._embedded.priority();
    }

    isKnown(): boolean {
        if(!this.Matches()){
            return false;
        }
        return this._embedded.isKnown();
    }

    isQuestioning(): boolean {
        if(!this.Matches()){
            return false;
        }
        return this._embedded.isQuestioning();
    }

    Activate(): void {
        this._embedded.Activate();
    }

    Update(): void {
        this._embedded.Update();
    }
}