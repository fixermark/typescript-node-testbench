import { codeToColor } from "./Color";
import { HEX_HEIGHT_PX, HEX_TEMPLATE, HEX_WIDTH_PX } from "./Hexagon";
import { HexAnimate } from "./HexAnimate";
import { PulseHex } from "./PulseHex";

const CANVAS_HEXES_ACROSS = 16;
const CANVAS_HEXES_DOWN = 16;
const DEFAULT_HEX_COLOR = 'eeeedd';

const MAX_VALUE = 0xdd;

const FPS = 30;

let curTime = 0;
let currentValue = 0;
let ascending = true;



let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

/**
 * Updates the background with the contents of a canvas
 * 
 * @param canvas Canvas to update to the background
 * @returns 
 */
function updateBackground(canvas: HTMLCanvasElement): void {

    const target = document.getElementById('background');
    if (!target) {
        return;
    }
    target.style.background = `url(${canvas.toDataURL()})`;
}

/**
 * Initializes the canvas
 */
function initCanvas() {
    canvas = document.createElement('canvas');
    canvas.width = CANVAS_HEXES_ACROSS * HEX_WIDTH_PX * 1.5;
    canvas.height = CANVAS_HEXES_DOWN / 2 * HEX_HEIGHT_PX;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('could not create 2D context.');
    }
    context = ctx;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const DEFAULT_HEX_COLOR = 'eeeedd';

    for (let rows = -1; rows < CANVAS_HEXES_DOWN; rows++) {
        for (let columns = -1; columns < CANVAS_HEXES_ACROSS; columns++) {
            context.save();
            HEX_TEMPLATE.offsetToHex(context, columns, rows);
            HEX_TEMPLATE.render(context, DEFAULT_HEX_COLOR);
            context.restore();
        }
    }

    updateBackground(canvas);
}

let animations: HexAnimate[] = [];

function updateRender() {
    const timestamp = Date.now();

    if (animations.length === 0) {
        animations.push(new PulseHex(
            Math.floor(Math.random() * CANVAS_HEXES_ACROSS),
            Math.floor(Math.random() * CANVAS_HEXES_DOWN),
            timestamp,
            timestamp + 1000,
            timestamp + 3000,
            codeToColor(DEFAULT_HEX_COLOR)!,
            {
                r: Math.random() * 256,
                g: Math.random() * 256,
                b: Math.random() * 256,
            }
        ));
    }

    animations = animations.filter((animation) => animation.animate(timestamp, context));

    updateBackground(canvas);

    setTimeout(updateRender, 1000 / FPS);
}

initCanvas();
setTimeout(updateRender, 1000 / FPS);