import { TagsFilter, TagUtils } from "@/model/TagsFilter"
import { TagDependentUIElementConstructor } from "./TagDependentUIElementConstructor"
import { OnlyShowIfConstructor } from "./OnlyShowIfConstructor"

export interface Mapping {
    k: TagsFilter
    txt: string
    priority?: number
    substitute?: boolean
}

export interface Freeform {
    key: string
    template: string
    renderTemplate: string
    placeholder?: string
    extraTags?: TagsFilter
}

export interface Options {
    /**
     * This is the string that is shown in the popup if this tag is missing.
     *
     * If 'question' is undefined, then the question is never asked at all
     * If the question is "" (empty string) then the question is 
     */
    question?: string

    /**
     * What is the priority of the question.
     * By default, in the popup of a feature, only one question is shown at the same time. If multiple questions are unanswered, the question with the highest priority is asked first
     */
    priority?: number

    /**
     * Mappings convert a well-known tag combination into a user friendly text.
     * It converts e.g. 'access=yes' into 'this area can be accessed'
     * 
     * If there are multiple tags that should be matched, And can be used. All tags in AND will be added when the question is picked (and the corresponding text will only be shown if all tags are present).
     * If AND is used, it is best practice to make sure every used tag is in every option (with empty string) to erase extra tags.
     * 
     * If a 'k' is null, then this one is shown by default. It can be used to force a default value, e.g. to show that the name of a POI is not (yet) known .
     * A mapping where 'k' is null will not be shown as option in the radio buttons.
     * 
     * 
     */
    mappings?: Mapping[]

    /**
     * If one wants to render a freeform tag (thus no predefined key/values) or if there are a few well-known tags with a freeform object,
     * use this.
     * In the question, it'll offer a textfield
     */
    freeform?: Freeform
    
    /**
     * In some very rare cases, tags have to be rewritten before displaying
     * This function can be used for that.
     * This function is ran on a _copy_ of the original properties
     */
    tagsPreprocessor?: ((tags: any) => void)
}


export class TagRenderingOptions implements TagDependentUIElementConstructor {
    public static inputValidation = {
        "$": (str) => true,
        "string": (str) => true,
        "int": (str) => str.indexOf(".") < 0 && !isNaN(Number(str)),
        "nat": (str) => str.indexOf(".") < 0 && !isNaN(Number(str)) && Number(str) > 0,
        "float": (str) => !isNaN(Number(str)),
    }

    /**
     * Notes: by not giving a 'question', one disables the question form alltogether
     */

    public options: Options


    constructor(options: Options) {
        this.options = options
    }

    onlyShowIf(tagsFilter: TagsFilter): TagDependentUIElementConstructor {
        return new OnlyShowIfConstructor(tagsFilter, this)
    }

    isQuestioning(tags: any): boolean {
        const tagsKV = TagUtils.proprtiesToKV(tags)

        for (const oneOnOneElement of this.options.mappings ?? []) {
            if (oneOnOneElement.k === null || oneOnOneElement.k.matches(tagsKV)) {
                return false
            }
        }
        if (this.options.freeform !== undefined && tags[this.options.freeform.key] !== undefined) {
            return false
        }
        if (this.options.question === undefined) {
            return false
        }

        return true
    }

    isKnown(properties: any): boolean {
        return !this.isQuestioning(properties)
    }

    priority(): number {
        return this.options.priority ?? 0
    }
}
