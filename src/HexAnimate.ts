export abstract class HexAnimate {
    /**
     * Run the animation script
     * @param timestamp JavaScript timestamp, in milliseconds, at which animation should be computed
     * @param ctx Context into which we should render the animation
     * @return true if animation should continue, false if it has completed
     */
    public abstract animate(timestamp: number, ctx: CanvasRenderingContext2D): boolean;
}
