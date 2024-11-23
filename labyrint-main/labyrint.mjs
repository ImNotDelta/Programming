import ANSI from "./utils/ANSI.mjs";
import KeyBoardManager from "./utils/KeyBoardManager.mjs";
import { readMapFile, readRecordFile } from "./utils/fileHelpers.mjs";
import * as CONST from "./constants.mjs";

const HP_MAX = 10;
const EMPTY = " ";
const HERO = "H";
const LOOT = "$"
const startingLevel = CONST.START_LEVEL_ID;
const levels = loadLevelListings();
const levelHistory = [];
const DOOR_MAPPINGS = {
    "start": {"D": { targetRoom: "aSharpPlace", targetDoor: "D" }},
    "aSharpPlace":{"D": { targetRoom: "start", targetDoor: "D" }, "d": { targetRoom: "thirdRoom", targetDoor: "d"}},
    "thirdRoom":{"d": { targetRoom: "thirdRoom", targetDoor: "d" }}
}

function loadLevelListings(source = CONST.LEVEL_LISTING_FILE) {
    let data = readRecordFile(source);
    let levels = {};
    for (const item of data) {
        let keyValue = item.split(":");
        if (keyValue.length >= 2) {
            let key = keyValue[0];
            let value = keyValue[1];
            levels[key] = value;
        }
    }
    return levels;
}

let levelData = readMapFile(levels[startingLevel]);
let level = levelData;

let pallet = {
    "█": ANSI.COLOR.LIGHT_GRAY,
    "H": ANSI.COLOR.RED,
    "$": ANSI.COLOR.YELLOW,
    "B": ANSI.COLOR.GREEN,
}


let isDirty = true;

let playerPos = {
    row: null,
    col: null,
}

let direction = -1;

let items = [];

const THINGS = [LOOT, EMPTY];

let eventText = "";

const playerStats = {
    hp: 8,
    cash: 0
}

class Labyrinth {
    constructor() {
        this.loadLevel(startingLevel);
    }

    loadLevel(levelID, fromDoor = null) {

        if (this.levelID) {
            const currentDoor = this.level[playerPos.row][playerPos.col];
            this.level[playerPos.row][playerPos.col] = currentDoor;
            levelHistory.push({
                LevelID: this.levelID,
                playerPos: { ...playerPos },
                lastDoor: currentDoor
            });
        }

        this.levelID = levelID;
        this.level = readMapFile(levels[levelID]);
        
        if (fromDoor) {
            const doorLocation = this.findSymbol(fromDoor);
            if (doorLocation) {
                this.level[doorLocation.row][doorLocation] = HERO;
                playerPos.row = doorLocation.row;
                playerPos.col = doorLocation.col;
            }
        } else if (levelID = "start") {
            const startingRow = 5;
            const startingCol = 4;
            this.level[startingRow][startingCol] = HERO;
            playerPos.row = startingRow;
            playerPos.col = startingCol;
        } else {
            playerPos.row = null;
            playerPos.col = null;
        }
        isDirty = true;
    } 

    findSymbol(symbol) {
        for (let row = 0; row < this.level.length; row++) {
            for (let col = 0; col < this.level[row].length; col++) {
                if (this.level[row][col] === symbol) {
                    return { row, col };
                }
            }
        }
    }

    update() {

        let dRow = 0;
        let dCol = 0;

        if (KeyBoardManager.isUpPressed()) {
            dRow = -1;
        } else if (KeyBoardManager.isDownPressed()) {
            dRow = 1;
        }

        if (KeyBoardManager.isLeftPressed()) {
            dCol = -1;
        } else if (KeyBoardManager.isRightPressed()) {
            dCol = 1;
        }

        let tRow = playerPos.row + dRow;
        let tCol = playerPos.col + dCol;

        if(tRow < 0 || tCol < 0 || tRow >= this.level.length || tCol >= this.level[0].length) return;

        const targetCell = this.level[tRow][tCol];

        if (THINGS.includes(level[tRow][tCol])) { // Is there anything where Hero is moving to

            let currentItem = level[tRow][tCol];
            if (currentItem == LOOT) {
                let loot = Math.round(Math.random() * 7) + 3;
                playerStats.cash += loot;
                eventText = `Player gained ${loot}$`;
            }

            // Restore Door

            level[playerPos.row][playerPos.col] = EMPTY;

            // Update the HERO
            level[tRow][tCol] = HERO;
            playerPos.row = tRow;
            playerPos.col = tCol;

            // Make the draw function draw.
            isDirty = true;
        } else {
            direction *= -1;
        }
    }

    draw() {

        if (isDirty == false) {
            return;
        }
        isDirty = false;

        console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);

        let rendering = "";

        rendering += renderHud();

        for (let row = 0; row < level.length; row++) {
            let rowRendering = "";
            for (let col = 0; col < level[row].length; col++) {
                let symbol = level[row][col];
                if (pallet[symbol] != undefined) {
                    rowRendering += pallet[symbol] + symbol + ANSI.COLOR_RESET;
                } else {
                    rowRendering += symbol;
                }
            }
            rowRendering += "\n";
            rendering += rowRendering;
        }

        console.log(rendering);
        if (eventText != "") {
            console.log(eventText);
            eventText = "";
        }
    }
}

function renderHud() {
    let hpBar = `Life:[${ANSI.COLOR.RED + pad(playerStats.hp, "♥︎") + ANSI.COLOR_RESET}${ANSI.COLOR.LIGHT_GRAY + pad(HP_MAX - playerStats.hp, "♥︎") + ANSI.COLOR_RESET}]`
    let cash = `$:${playerStats.cash}`;
    return `${hpBar} ${cash}\n`;
}

function pad(len, text) {
    let output = "";
    for (let i = 0; i < len; i++) {
        output += text;
    }
    return output;
}


export default Labyrinth;