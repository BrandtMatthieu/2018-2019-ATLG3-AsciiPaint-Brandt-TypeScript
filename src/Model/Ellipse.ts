import Point from "./Point";
import Shape from "./Shape";
import ShapeType from "./ShapeType";

import { NegativeRadiusLength } from "./Error/NegativeRadiusError";

export default class Ellipse extends Shape {

    private _radiusX: number;
    private _radiusY: number;

    constructor(center: Point, radiusX: number, radiusY: number, fill: string, outline: string, id: number) {
        if (radiusY) { // ellipse
            super(center, ShapeType.Ellipse, fill, outline, id);
            this.radiusX = radiusX;
            this.radiusY = radiusY;
        } else { // circle
            super(center, ShapeType.Circle, fill, outline, id);
            this.radiusX = radiusX;
            this.radiusY = radiusX;
        }
    }

    get radiusX(): number {
        return this._radiusX;
    }

    set radiusX(radiusX: number) {
        if (radiusX < 0) {
            throw new NegativeRadiusLength();
        } else {
            this._radiusX = radiusX;
        }
    }

    get radiusY(): number {
        return this._radiusY;
    }

    set radiusY(radiusY: number) {
        if (radiusY < 0) {
            throw new NegativeRadiusLength();
        } else {
            this._radiusY = radiusY;
        }
    }

    public isInside(p: Point): boolean {
        return (Math.pow((p.x - this.center.x), 2) * Math.pow(this.radiusY, 2))
            + (Math.pow((p.y - this.center.y), 2)) * (Math.pow(this.radiusX, 2))
            <= (Math.pow(this.radiusX, 2) * Math.pow(this.radiusY, 2));
    }

    public toString(): string {
        return `${super.toString()}, RadiusX: ${this.radiusX}, RadiusY: ${this.radiusY}`;
    }
}
