import BodyHeight from "./BodyHeight";
import HeaderHeight from "./HeaderHeight";
import iEntity from "./interfaces/iEntity";
import WrapText from "./WrapText";


type tDictionary = { [key: string]: string };

let dictionaryLookupCache: tDictionary;

function randomizeObjectKeys(obj: { [key: string]: any }) {
    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const keys = Object.keys(obj);

    shuffleArray(keys);

    const randomizedObj: { [key: string]: any } = {};

    keys.forEach(key => {
        randomizedObj[key] = obj[key]; // Reconstruct the object with shuffled keys
    });

    return randomizedObj;

}

// Footer Levels
export const dictionary: () => tDictionary = () => {

    // todo - fetch https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json

    if (undefined === dictionaryLookupCache) {

        dictionaryLookupCache = {}

        fetch('https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary.json')
            .then(response => response.json())
            .then(data => dictionaryLookupCache = randomizeObjectKeys(data))
            .catch(error => console.error('Error fetching dictionary', error));

    }

    return dictionaryLookupCache

}


interface iDictionary {
    word: string;
    definition: string;
}

export default class Dictionary implements iEntity {
    word: string;
    definition: string;
    closed: boolean = false;

    constructor({word, definition}: iDictionary) {
        this.word = word;
        this.definition = definition;
        console.log('Dictionary');
    }

    draw(context: CanvasRenderingContext2D): void {

        // draw a transparent box over the game to show the definition
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillRect(0, HeaderHeight(), context.canvas.width, BodyHeight());

        WrapText({
            context: context,
            text: this.definition,
            x: context.canvas.width * .05,
            y: HeaderHeight(),
            w: context.canvas.width - context.canvas.width * .1,
            h: BodyHeight(),
            scrollSpeed: 0
        });


    }
    move(_gameState: any): boolean {
        return !this.closed;
    }

}