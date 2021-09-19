import Point from "./Point";
import Shape from "./Shape";
import ShapeType from "./ShapeType";

export default class Line extends Shape {

    private _p1: Point;
    private _p2: Point;

    constructor(p1: Point, p2: Point, fill: string, outline: string, id: number) {
        super(
            new Point(
                (p1.x + p2.x) / 2,
                (p1.y + p2.y) / 2,
                null,
                null,
                null,
                null),
            ShapeType.Line,
            fill,
            outline,
            id);
        this._p1 = p1;
        this._p2 = p2;
    }

    get p1(): Point {
        return this._p1;
    }

    set p1(p1: Point) {
        this._p1 = p1;
    }

    get p2(): Point {
        return this._p2;
    }

    set p2(p2: Point) {
        this.p2 = p2;
    }

    public toString(): string {
        return `${super.toString()}, Point1: ${this.p1}, Point2: ${this.p2}`;
    }

    public setCenter() {
        this.center = new Point(
            (this.p1.center.x + this.p2.center.x) / 2,
            (this.p1.center.y + this.p2.center.y) / 2,
            null,
            null,
            null,
            null);
    }
}
