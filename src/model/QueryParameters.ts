import { ref, watch, Ref } from "vue";


/**
 * Wraps the query parameters into -/-UIEventSources-/- reactive()
 */
export class QueryParameters {
    private static order: string [] = ["layout","test","z","lat","lon"];
    private static params = QueryParameters.init();
    
    private static addOrder(key: string){
        if (!this.order.includes(key)) {
            console.log("Adding order", key)
            this.order.push(key)
        }
    }

    private static addNewParam(key: string, val: string) {
        QueryParameters.addOrder(key)
        const valRef = ref(val)
        QueryParameters.params[key] = valRef;
        watch(valRef, () => QueryParameters.serialize())
        return valRef
    }

    private static init() {
        const knownSources: { [key: string]: Ref<string>; } = {}
        const searchString = window.location.search
        if (searchString) {
            const params = new URLSearchParams(searchString)
            // @ts-ignore
            for (const [key, val] of params.entries()) {
                this.addNewParam(key, val)
            }
        }
        return knownSources;
    }

    private static serialize() {
        const params = new URLSearchParams()
        for (const key of QueryParameters.order) {
            if (QueryParameters.params[key] === undefined || QueryParameters.params[key].value === undefined) {
                continue;
            }
            params.append(key, encodeURIComponent(QueryParameters.params[key].value))
        }
        history.replaceState(null, "", `?${params}`);
    }

    public static getQueryParameter(key: string): Ref<string> {
        if (QueryParameters.params[key] !== undefined) {
            return QueryParameters.params[key]
        }
        return this.addNewParam(key, undefined)
    }
}
