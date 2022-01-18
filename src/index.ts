const SEGMENT = 100 / 6;
const HEX_HEIGHT_WIDTH_RATIO = 1.1547005;

const HEX_HEIGHT_PX = 80;
const HEX_WIDTH_PX = HEX_HEIGHT_PX * HEX_HEIGHT_WIDTH_RATIO;
const HEX_INSET_PX = 2;

const CANVAS_HEXES_ACROSS = 16;
const CANVAS_HEXES_DOWN = 16;
const DEFAULT_HEX_COLOR = 'eeeedd';

const MAX_VALUE=0xdd;

const FPS = 24;

let curTime = 0;
let currentValue = 0;
let ascending = true;

/**
 * A standard hexagon to render
 */
class Hexagon {
    private path: Path2D;
    private width: number;

    /**
     * constructor
     * @param height The height of the hexagon. Width will be height * HEX_HEIGHT_WIDTH_RATIO
     * @param insetPx How many pixels to inset the hexagon
     */
    constructor(private height: number, insetPx: number) {
        this.width = height * HEX_HEIGHT_WIDTH_RATIO;
        const segment = this.width / 4; 
        this.path = new Path2D();

        this.path.moveTo(insetPx, height / 2);
        this.path.lineTo(segment + insetPx, insetPx);
        this.path.lineTo(3 * segment - insetPx, insetPx);
        this.path.lineTo(4 * segment - insetPx, height / 2);
        this.path.lineTo(3 * segment - insetPx, height - insetPx);
        this.path.lineTo(segment + insetPx, height - insetPx);
        this.path.closePath();
    }

    /**
     * Render the hexagon at the current position
     * 
     * @param ctx The context into which to render
     * @param color The color to use
     */
    public render(ctx: CanvasRenderingContext2D, color: string) {
        ctx.fillStyle = '#' + color;
        ctx.fill(this.path);
    }

    /**
     * Offsets the transform in the 2D context to the specified hex coordinates
     * 
     * @param ctx Which context to update
     * @param x X offset, in hexagons
     * @param y y offset, in half-hexagons (i.e. if y is odd, hex will be one half-cell over)
     */
    public offsetToHex(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.translate(x * this.width * 1.5 + (Math.abs(y) % 2 === 1 ? this.width * 0.75 : 0),
        this.height * y / 2);
    }
}

let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
const hexTemplate = new Hexagon(HEX_HEIGHT_PX, HEX_INSET_PX);

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
    target.style.background=`url(${canvas.toDataURL()})`;
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
    context.fillRect(0,0, canvas.width, canvas.height);

    const DEFAULT_HEX_COLOR = 'eeeedd';

    for (let rows = -1; rows < CANVAS_HEXES_DOWN; rows++) {
        for (let columns = -1; columns < CANVAS_HEXES_ACROSS; columns++) {
            context.save();
            hexTemplate.offsetToHex(context, columns, rows);
            hexTemplate.render(context, DEFAULT_HEX_COLOR);
            context.restore();
        }
    }

    updateBackground(canvas);
}

function updateRender() {
    let increment = (MAX_VALUE / 4.0 / FPS);
    if(!ascending) {
        increment = -increment;
    }

    currentValue += increment;
    if (currentValue > MAX_VALUE || currentValue < 0) {
        currentValue = Math.min(MAX_VALUE, Math.max(0, currentValue));
        ascending = !ascending;
    }

    let stringRep = Math.floor(currentValue).toString(16);
    while (stringRep.length < 2) {
        stringRep = '0' + stringRep;
    }

    context.save();
    hexTemplate.offsetToHex(context, 0,0);
    hexTemplate.render(context, 'eeee' + stringRep);
    context.restore();

    updateBackground(canvas);

    setTimeout(updateRender, 1000/FPS);
}

initCanvas();
setTimeout(updateRender, 1000/FPS);