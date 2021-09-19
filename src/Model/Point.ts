import Shape from "./Shape";
import ShapeType from "./ShapeType";

export default class Point extends Shape {

    private _x: number;
    private _y: number;

    constructor(x: number, y: number, center: Point, fill: string, outline: string, id: number) {
        if (!(center && fill && outline && id)) { // si juste centre (x;y)
            super(null, null, null, null, null);
            this._x = x;
            this._y = y;
        } else { // si forme
            super(center, ShapeType.Point, fill, outline, id);
            /*
            this._x = null;
            this._y = null;
            */
        }
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        this._y = y;
    }

    public move(dx: number, dy: number): void {
        this.x += dx;
        this.y += dy;
    }

    public toString(): string {
        if (this instanceof Shape) {
            return `${super.toString()}`;
        } else {
            return `(${this.x}; ${this.y})`;
        }
    }
}
