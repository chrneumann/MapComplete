/**
 * Gives a clean float, or undefined if parsing fails
 * @param str
 */
export function asFloat(str: string): number {
    if (str) {
        const i = parseFloat(str);
        if (isNaN(i)) {
            return undefined;
        }
        return i;
    }
    return undefined;
}

export function upper(str: string){
    return str.substr(0,1).toUpperCase() + str.substr(1);
}
