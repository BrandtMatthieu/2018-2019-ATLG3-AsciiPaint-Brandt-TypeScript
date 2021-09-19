import Point from "./Point";
import ShapeType from "./ShapeType";

import { NoMatchingShapeId } from "./Error/NoMatchingShapeIdError";
import { UnknownColor } from "./Error/UnknownColorError";
import { UnknownShape } from "./Error/UnknownShapeError";

export default abstract class Shape {

    private _center: Point;
    private _type: ShapeType;
    private _fill: string;
    private _outline: string;
    private _id: number;

    constructor(center: Point, type: ShapeType, fill: string, outline: string, id: number) {
        this._center = center;
        this._type = type;
        this._id = id;
        if (fill) {
            this._fill = fill;
        }
        if (outline) {
            this._outline = outline;
        }
    }

    get center(): Point {
        return this._center;
    }

    set center(center: Point) {
        this._center = center;
    }

    get type(): ShapeType {
        return this._type;
    }

    set type(type: ShapeType) {
        if (!Object.keys(ShapeType).includes(type[0].toUpperCase() + type.substring(1))) {
            try {
                throw new UnknownShape();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._type = type;
        }
    }

    get fill(): string {
        return this._fill;
    }

    set fill(fill: string) {
        if (fill === undefined || fill.length < 1) {
            try {
                throw new UnknownColor();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._fill = fill.substring(0, 1);
        }
    }

    get outline(): string {
        return this._outline;
    }

    set outline(outline: string) {
        if (outline === undefined || outline.length < 1) {
            try {
                throw new UnknownColor();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._outline = outline.substring(0, 1);
        }
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        if (id < 0) {
            try {
                throw new NoMatchingShapeId();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._id = id;
        }
    }

    public move(dx: number, dy: number): void {
        this.center.move(dx, dy);
    }

    public toString(): string {
        return `\t${this.type} | Center: ${this.center.toString()}, ` +
        `Fill: ${this.fill}, Outline: ${this.outline}, Id: ${this.id}`;
    }
}
