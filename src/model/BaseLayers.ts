import { Layer, TileLayer } from "leaflet"


// Yes, this could be an interface, typescript was acting up
export class LayerDefinition {
    name: string
    layer: Layer

    constructor(name: string, layer: Layer) {
        this.name = name
        this.layer = layer
    }
}


export default class BaseLayers {
    public static readonly defaultLayer = new LayerDefinition(
        "Kaart van OpenStreetMap",
        new TileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: '',
                maxZoom: 19,
                minZoom: 1
            }
        )
    )

    public static readonly baseLayers = [
        new LayerDefinition(
            "Luchtfoto Vlaanderen (recentste door AIV)",
            new TileLayer(
                "https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&" +
                "LAYER=omwrgbmrvl&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileRow={y}&tileCol={x}",
                {
                    // omwrgbmrvl
                    attribution: 'Luchtfoto\'s van © AIV Vlaanderen (Laatste)  © AGIV',
                    maxZoom: 20,
                    minZoom: 1,
                    // @ts-ignore TODO: What should this do?
                    wmts: true
                }
            )
        ),
        BaseLayers.defaultLayer,
        new LayerDefinition(
            "Luchtfoto Vlaanderen (2013-2015, door AIV)",
            new TileLayer.WMS(
                'https://geoservices.informatievlaanderen.be/raadpleegdiensten/OGW/wms?s',
                {
                    layers: "OGWRGB13_15VL",
                    attribution: "Luchtfoto's van © AIV Vlaanderen (2013-2015) | "
                }
            )
        ),
        new LayerDefinition(
            "Kaart Grootschalig ReferentieBestand Vlaanderen (GRB) door AIV",
            new TileLayer.WMS(
                "https://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&" +
                "LAYER=grb_bsk&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileCol={x}&tileRow={y}",
                {
                    attribution: 'Achtergrond <i>Grootschalig ReferentieBestand</i>(GRB) © AGIV',
                    maxZoom: 20,
                    minZoom: 1,
                    // @ts-ignore TODO: What should this do?
                    wmts: true
                }
            )
        )
    ]
}
