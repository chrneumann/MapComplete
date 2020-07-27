import {LayerDefinition} from "./LayerDefinition"


/**
 * A layout is a collection of settings of the global view (thus: welcome text, title, selection of layers).
 */
export class Layout {
    public name: string
    public title: string
    public layers: LayerDefinition[]
    public welcomeMessage: string
    public gettingStartedPlzLogin: string
    public welcomeBackMessage: string
    public welcomeTail: string

    public startzoom: number
    public supportedLanguages: string[]
    public startLon: number
    public startLat: number

    public locationContains: string[]

    /**
     * 
     * @param name: The name used in the query string. If in the query "quests=<name>" is defined, it will select this layout
     * @param title: Will be used in the <title> of the page
     * @param layers: The layers to show, a list of LayerDefinitions
     * @param startzoom: The initial starting zoom of the map
     * @param startLat:The initial starting latitude of the map
     * @param startLon: the initial starting longitude of the map
     * @param welcomeMessage: This message is shown in the collapsable box on the left
     * @param gettingStartedPlzLogin: This is shown below the welcomemessage and wrapped in a login link.
     * @param welcomeBackMessage: This is shown when the user is logged in
     * @param welcomeTail: This text is shown below the login message. It is ideal for extra help
     */
    constructor(
        name: string,
        supportedLanguages: string[],
        title: string,
        layers: LayerDefinition[],
        startzoom: number,
        startLat: number,
        startLon: number,
        welcomeMessage: string,
        gettingStartedPlzLogin: string = "general.getStarted",
        welcomeBackMessage: string = "general.welcomeBack",
        welcomeTail: string = ""
    ) {
        this.supportedLanguages = supportedLanguages
        this.title = title
        this.startLon = startLon
        this.startLat = startLat
        this.startzoom = startzoom
        this.name = name
        this.layers = layers
        this.welcomeMessage = welcomeMessage
        this.gettingStartedPlzLogin = gettingStartedPlzLogin
        this.welcomeBackMessage = welcomeBackMessage
        this.welcomeTail = welcomeTail
    }


}

// export class WelcomeMessage extends UIElement {
//     private readonly layout: Layout
//     private readonly userDetails: UIEventSource<UserDetails>
//     private osmConnection: OsmConnection

//     private readonly description: UIElement
//     private readonly plzLogIn: UIElement
//     private readonly welcomeBack: UIElement
//     private readonly tail: UIElement


//     constructor(layout: Layout, osmConnection: OsmConnection) {
//         super(osmConnection.userDetails)
//         this.ListenTo(Locale.language)
//         this.osmConnection = osmConnection
//         this.layout = layout
//         this.userDetails = osmConnection.userDetails

//         this.description = layout.welcomeMessage
//         this.plzLogIn = layout.gettingStartedPlzLogin
//         this.welcomeBack = layout.welcomeBackMessage
//         this.tail = layout.welcomeTail
//     }

//     InnerRender(): string {
//         return "<span id='welcomeMessage'>" +
//             this.description.Render() +
//             (this.userDetails.data.loggedIn ? this.welcomeBack : this.plzLogIn).Render() +
//             this.tail.Render() +
//             "</span>"

            
//         /*
//         return new VariableUiElement(
//             this.userDetails.map((userdetails) => {
//             }),
//             function () {
               
//             }).ListenTo(Locale.language)*/
//     }

//     protected InnerUpdate(htmlElement: HTMLElement) {
//         this.osmConnection.registerActivateOsmAUthenticationClass()
//     }
// }
