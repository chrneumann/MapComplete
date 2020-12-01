import {UIEventSource} from "../UIEventSource";


/**
 * Handles the path name which includes the selected element id.
 *
 * Example: /foo-bar/@node_523054353/
 */
export default class PathName extends UIEventSource<string> {
    idMap = {
        'node/2294693961': 'savory',
        'node/413110332': 'kuli-alma',
        'node/5161580821': 'vevay',
        'node/2058306021': 'zeil-kitchen',
    };
    revIdMap = {};

    constructor() {
        super(window.location.pathname);

        var self = this;

        this.revIdMap = Object.keys(this.idMap).reduce(
            (xs, x) => ({
                ...xs,
                [self.idMap[x]]: x
            }), {}
        );

        this.addCallback(name => {
            const url = name + window.location.search;
            history.pushState(null, '',  url);
        });
    }

    /**
     * Gets the currently selected id.
     */
    public getSelectedId(): string | null {
        const elements = this.data.split('/');
        let id = elements[elements.length - 2];
        if (this.revIdMap[id]) {
            return this.revIdMap[id];
        }
        if (id.substring(0,1) === '@') {
            id = id.substring(1);
        }
        return id.replace(/_/g, '/');
    }

    /**
     * Sets the currently selected id.
     */
    public setSelectedId(id:string) {
        let elements = this.data.split('/');
        if (elements.length === 2) {
            elements.unshift('');
        }
        const newId = this.idMap[id]
            || '@' + id.replace(/\//g, '_');
        elements[1] = newId;
        console.log(elements);
        this.setData(elements.join('/'));
    }
}