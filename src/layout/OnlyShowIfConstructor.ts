import { TagUtils, TagsFilter } from "@/model/TagsFilter";
import { TagDependentUIElementConstructor } from "./TagDependentUIElementConstructor";


export class OnlyShowIfConstructor implements TagDependentUIElementConstructor{
    private _tagsFilter: TagsFilter;
    private _embedded: TagDependentUIElementConstructor;
    
    constructor(tagsFilter : TagsFilter, embedded: TagDependentUIElementConstructor) {
        this._tagsFilter = tagsFilter;
        this._embedded = embedded;
    }

    isKnown(properties: any): boolean {
        if(!this.Matches(properties)){
            return true;
        }
        return this._embedded.isKnown(properties);
    }

    isQuestioning(properties: any): boolean {
        if(!this.Matches(properties)){
            return false;
        }
        return this._embedded.isQuestioning(properties);
    }

    priority(): number {
        return this._embedded.priority();
    }
    
    public get embedded(): TagDependentUIElementConstructor {
        return this._embedded
    }
    
    private Matches(properties: any) : boolean{
        return this._tagsFilter.matches(TagUtils.proprtiesToKV(properties));
    } 
}
