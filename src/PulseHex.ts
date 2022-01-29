import { Color, colorToCode, interpolate } from "./Color";
import { HEX_TEMPLATE } from "./Hexagon";
import { HexAnimate } from "./HexAnimate";


/**
 * An animation that pulses a hexagon. Colors components are 0 to 255. Times are
 * JavaScript timestamps
 */
export class PulseHex extends HexAnimate {
    constructor(
        private xIndex: number,
        private yIndex: number,
        private startTime: number,
        private peakTime: number,
        private endTime: number,
        private startColor: Color,
        private endColor: Color) {
        super();
    }

    public animate(timestamp: number, ctx: CanvasRenderingContext2D): boolean {
        if (timestamp > this.endTime) {
            ctx.save();
            HEX_TEMPLATE.offsetToHex(ctx, 0, 0);
            HEX_TEMPLATE.render(ctx, colorToCode(this.startColor));
            ctx.restore();

            return false;
        }
        const color = timestamp < this.peakTime ?
            interpolate(this.startColor, this.endColor, (timestamp - this.startTime) / (this.peakTime - this.startTime)) :
            interpolate(this.startColor, this.endColor, (this.endTime - timestamp) / (this.endTime - this.peakTime));


        let stringRep = colorToCode(color);

        ctx.save();
        HEX_TEMPLATE.offsetToHex(ctx, this.xIndex, this.yIndex);
        HEX_TEMPLATE.render(ctx, stringRep);
        ctx.restore();

        return true;
    }
}
