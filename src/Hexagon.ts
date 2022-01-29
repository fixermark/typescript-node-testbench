const SEGMENT = 100 / 6;
const HEX_HEIGHT_WIDTH_RATIO = 1.1547005;

export const HEX_HEIGHT_PX = 80;
export const HEX_WIDTH_PX = HEX_HEIGHT_PX * HEX_HEIGHT_WIDTH_RATIO;
const HEX_INSET_PX = 2;

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
        console.log(`fill #${color}`);
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

export const HEX_TEMPLATE = new Hexagon(HEX_HEIGHT_PX, HEX_INSET_PX);
