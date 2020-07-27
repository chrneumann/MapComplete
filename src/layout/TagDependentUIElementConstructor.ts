export interface TagDependentUIElementConstructor {
    isKnown(properties: any): boolean;
    isQuestioning(properties: any): boolean;
    priority(): number;
}
