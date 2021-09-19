import Point from "./Point";
import Shape from "./Shape";
import ShapeType from "./ShapeType";

import { NegativeShapeSize } from "./Error/NegativeShapeSizeError";

export default class Rectangle extends Shape {

    private _width: number;
    private _height: number;

    constructor(center: Point, width: number, height: number, fill: string, outline: string, id: number) {
        if (height) { // rectangle
            super(center, ShapeType.Rectangle, fill, outline, id);
            this.width = width;
            this.height = height;
        } else { // square
            super(center, ShapeType.Square, fill, outline, id);
            this.width = width;
            this.height = width;
        }
    }

    get width(): number {
        return this._width;
    }

    set width(width: number) {
        if (width < 0) {
            try {
                throw new NegativeShapeSize();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._width = width;
        }
    }

    get height(): number {
        return this._height;
    }

    set height(height: number) {
        if (height < 0) {
            try {
                throw new NegativeShapeSize();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._height = height;
        }
    }

    public toString(): string {
        return `${super.toString()}, Width: ${this.width}, Height: ${this.height}`;
    }
}
