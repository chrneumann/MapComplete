/*


import {UIEventSource} from "./Logic/UIEventSource";
import {FeatureInfoBox} from "./UI/Popup/FeatureInfoBox";
import SharedLayers from "./Customizations/SharedLayers";

const tags = {
    mapillary: "wweALGY5g8_T8UjGkcWCfw",
    wikimedia_commons: "File:Boekenkast Sint-Lodewijks.jpg"
}
const src = new UIEventSource(tags);

new FeatureInfoBox(src, SharedLayers.sharedLayers["ghost_bike"]).AttachTo('maindiv');

//const subs = new SubstitutedTranslation(new Translation({"nl":"NL {image_carousel()} {image_upload()}"}), src)
//subs.AttachTo("maindiv")
/*/


import {Utils} from "./Utils";
import {FixedUiElement} from "./UI/Base/FixedUiElement";


function generateStats(action: (stats: string) => void) {
    // Binary searches the latest changeset
    function search(lowerBound: number,
                    upperBound: number,
                    onCsFound: ((id: number, lastDate: Date) => void),
                    depth = 0) {
        if (depth > 30) {
            return;
        }
        const tested = Math.floor((lowerBound + upperBound) / 2);
        console.log("Testing", tested)
        Utils.changesetDate(tested, (createdAtDate: Date) => {
            new FixedUiElement(`Searching, value between ${lowerBound} and ${upperBound}. Queries till now: ${depth}`).AttachTo('maindiv')
            if (lowerBound + 1 >= upperBound) {
                onCsFound(lowerBound, createdAtDate);
                return;
            }
            if (createdAtDate !== undefined) {
                search(tested, upperBound, onCsFound, depth + 1)
            } else {
                search(lowerBound, tested, onCsFound, depth + 1);
            }
        })

    }


    search(91000000, 100000000, (last, lastDate: Date) => {
            const link = "http://osm.org/changeset/" + last;

            const delta = 100000;

            Utils.changesetDate(last - delta, (prevDate) => {


                const diff = (lastDate.getTime() - prevDate.getTime()) / 1000;

                // Diff: seconds needed/delta changesets
                const secsPerCS = diff / delta;

                const stillNeeded = 1000000 - (last % 1000000);
                const timeNeededSeconds = Math.floor(secsPerCS * stillNeeded);

                const secNeeded = timeNeededSeconds % 60;
                const minNeeded = Math.floor(timeNeededSeconds / 60) % 60;
                const hourNeeded = Math.floor(timeNeededSeconds / (60 * 60)) % 24;
                const daysNeeded = Math.floor(timeNeededSeconds / (24 * 60 * 60));

                const result = `Last changeset: <a href='${link}'>${link}</a><br/>We needed ${(Math.floor(diff / 60))} minutes for the last ${delta} changesets.<br/>
This is around ${secsPerCS} seconds/changeset.<br/> The next million (still ${stillNeeded} away) will be broken in around ${daysNeeded} days ${hourNeeded}:${minNeeded}:${secNeeded}`
                action(result);
            })

        }
    );

}

generateStats((stats) => {
    new FixedUiElement(stats).AttachTo('maindiv')
})


//*/