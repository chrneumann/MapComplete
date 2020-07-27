import { Ref } from "vue";
import { Changes } from "@/model/Changes";

export interface FromConstructorDependencies {
    tags: Ref<any>,
    changes: Changes
}

export abstract class TagDependentUIElement {
    fromConstructor(dependencies): TagDependantUIElement {
        return new OnlyShowIf(
            dependencies.tags, 
            this._embedded.construct(dependencies),
            this._tagsFilter
        );
    }

    abstract isKnown(): boolean;

    abstract isQuestioning(): boolean;
    
    abstract priority() : number;
}
