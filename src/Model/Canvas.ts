import * as Controller from "../Controller/Controller";
import * as vue from "../View/View";
import Ellipse from "./Ellipse";
import Line from "./Line";
import Pixel from "./Pixel";
import Point from "./Point";
import Rectangle from "./Rectangle";
import Shape from "./Shape";

import { AlreadyAtBack } from "./Error/AlreadyAtBackError";
import { AlreadyAtFront } from "./Error/AlreadyAtFrontError";
import { EmptyCanvas } from "./Error/EmptyCanvasError";
import { NoMatchingShapeId } from "./Error/NoMatchingShapeIdError";

export default class Canvas {
    private _sizeX: number;
    private _sizeY: number;
    private _defaultValue: string;
    private _id: number;
    private _canvas: Pixel[][];
    private _shapes: Shape[];
    private _shapeIdCount: number;
    private _grid: boolean;
    private _border: boolean;
    private _history: string[];

    constructor(sizeX: number, sizeY: number, defaultValue: string, grid: boolean, border: boolean, id: number) {
        this._sizeX = sizeX;
        this._sizeY = sizeY;
        this._defaultValue = defaultValue;
        this._id = id;
        this._canvas = new Array(sizeY);
        for (let j = 0; j < sizeY; j++) {
            this._canvas[j] = new Array(sizeX);
            for (let i = 0; i < sizeX; i++) {
                this._canvas[j][i] = new Pixel(null);
            }
        }
        this._shapes = [];
        this._shapeIdCount = 0;
        this._grid = grid;
        this._border = border;
        this._history = [];
    }

    get sizeX(): number {
        return this._sizeX;
    }

    set sizeX(sizeX: number) {
        this._sizeX = sizeX;
    }

    get sizeY(): number {
        return this._sizeY;
    }

    set sizeY(sizeY: number) {
        this._sizeY = sizeY;
    }

    get defaultValue(): string {
        return this._defaultValue;
    }

    set defaultValue(defaultValue: string) {
        this._defaultValue = defaultValue;
    }

    get canvas(): Pixel[][] {
        return this._canvas;
    }

    set canvas(canvas: Pixel[][]) {
        this._canvas = canvas;
    }

    get id(): number {
        return this._id;
    }

    set id(id: number) {
        this._id = id;
    }

    get shapes(): Shape[] {
        return this._shapes;
    }

    set shapes(shapes: Shape[]) {
        this._shapes = shapes;
    }

    get shapeIdCount(): number {
        return this._shapeIdCount;
    }

    set shapeIdCount(shapeIdCount: number) {
        this._shapeIdCount = shapeIdCount;
    }

    get grid(): boolean {
        return this._grid;
    }

    set grid(grid: boolean) {
        this._grid = grid;
    }

    get border(): boolean {
        return this._border;
    }

    set border(border: boolean) {
        this._border = border;
    }

    get history(): string[] {
        return this._history;
    }

    set history(history: string[]) {
        this._history = history;
    }

    public addShape(args: string[]): void {
        // ellipse <x> <y> <rx> <ry> ?<fill> ?<outline>
        // circle <x> <y> <r> ?<fill> ?<outline>
        // rectangle <x> <y> <w> <h> ?<fill> ?<outline>
        // square <x> <y> <c> ?<fill> ?<outline>
        // line <p1x> <p1y> <p2x> <p2y> ?<fill> ?<outline>
        // point <x> <y> ?<fill> ?<outline>
        switch (args[1].toLowerCase()) {
            case `ellipse`:
                if (Controller.hasGoodNumberArguments(6, 8, args)) {
                    this.shapes.push(
                        new Ellipse(
                            new Point(
                                Number.parseFloat(args[2]),
                                Number.parseFloat(args[3]),
                                null,
                                null,
                                null,
                                null),
                            Number.parseFloat(args[4]),
                            Number.parseFloat(args[5]),
                            args[6] ? args[6].toString().substring(0, 1) : null,
                            args[7] ? args[7].toString().substring(0, 1) : null,
                            this.shapeIdCount));
                }
                break;
            case `circle`:
                if (Controller.hasGoodNumberArguments(5, 7, args)) {
                    this.shapes.push(
                        new Ellipse(
                            new Point(
                                Number.parseFloat(args[2]),
                                Number.parseFloat(args[3]),
                                null,
                                null,
                                null,
                                null),
                            Number.parseFloat(args[4]),
                            null,
                            args[5] ? args[5].toString().substring(0, 1) : null,
                            args[6] ? args[6].toString().substring(0, 1) : null,
                            this.shapeIdCount));
                }
                break;
            case `rectangle`:
                if (Controller.hasGoodNumberArguments(6, 8, args)) {
                    this.shapes.push(
                        new Rectangle(
                            new Point(
                                Number.parseFloat(args[2]),
                                Number.parseFloat(args[3]),
                                null,
                                null,
                                null,
                                null),
                            Number.parseFloat(args[4]),
                            Number.parseFloat(args[5]),
                            args[6] ? args[6].toString().substring(0, 1) : null,
                            args[7] ? args[7].toString().substring(0, 1) : null,
                            this.shapeIdCount));
                }
                break;
            case `square`:
                if (Controller.hasGoodNumberArguments(5, 7, args)) {
                    this.shapes.push(
                        new Rectangle(
                            new Point(
                                Number.parseFloat(args[2]),
                                Number.parseFloat(args[3]),
                                null,
                                null,
                                null,
                                null),
                            Number.parseFloat(args[4]),
                            null,
                            args[5] ? args[5].toString().substring(0, 1) : null,
                            args[6] ? args[6].toString().substring(0, 1) : null,
                            this.shapeIdCount));
                }
                break;
            case `line`:
                if (Controller.hasGoodNumberArguments(6, 8, args)) {
                    this.shapes.push(
                        new Line(
                            new Point(
                                Number.parseFloat(args[2]),
                                Number.parseFloat(args[3]),
                                null,
                                null,
                                null,
                                null),
                            new Point(
                                Number.parseFloat(args[4]),
                                Number.parseFloat(args[5]),
                                null,
                                null,
                                null,
                                null),
                            args[6] ? args[6].toString().substring(0, 1) : null,
                            args[7] ? args[7].toString().substring(0, 1) : null,
                            this.shapeIdCount));
                }
                break;
            case `point`:
                if (Controller.hasGoodNumberArguments(4, 6, args)) {
                this.shapes.push(
                    new Point(
                        Number.parseFloat(args[2]),
                        Number.parseFloat(args[3]),
                        new Point(
                            Number.parseFloat(args[2]),
                            Number.parseFloat(args[3]),
                            null,
                            null,
                            null,
                            null),
                        args[4] ? args[4].toString().substring(0, 1) : null,
                        args[5] ? args[5].toString().substring(0, 1) : null,
                        this.shapeIdCount));
                }
                break;
        }
        this.shapeIdCount++;
    }

    public toString(): string {
        return `\tCanvas | Id: ${this.id} ShapeCount: ${this.shapes.length} Size: ${this.sizeX - 1}x${this.sizeY - 1}`;
    }

    public listShapes(): void {
        if (this.shapes.length > 0) {
            console.log("Canvas | Shapes for canvas id: " +
            `${this.id} ${this.shapes.length > 0 ? `(${this.shapes.length} shapes found)` : ``}`);
            console.log(`\tBack`);
            for (const shape of this.shapes) {
                console.log(shape.toString());
            }
            console.log(`\tFront`);
        } else {
            try {
                throw new EmptyCanvas();
            } catch (error) {
                console.error(error.toString());
            }
        }
    }

    public hasShapeWithId(id: number): boolean {
        if (this.shapes.filter((shape) => shape.id === id).length > 0) {
            return true;
        } else {
            try {
                throw new NoMatchingShapeId();
            } catch (error) {
                console.error(error.toString());
            }
        }
    }

    public getShapeWithId(id: number) {
        if (this.hasShapeWithId(id)) {
            return this.shapes.filter((shape) => shape.id === id)[0];
        }
    }

    public removeShapeWithId(id: number): void {
        if (this.shapes.length !== 0) {
            if (this.hasShapeWithId(id)) {
                this.shapes.splice(this.shapes.findIndex((e: Shape): boolean => e.id === id), 1);
            }
        } else {
            try {
                throw new EmptyCanvas();
            } catch (error) {
                console.error(error.toString());
            }
        }
    }

    public addToHistory(args: string[]): void {
        this.history.push(args.join(` `));
     }

    public clearShapes(): void {
        this.shapes = [];
    }

    public clearCanvas(): void {
        this.canvas = new Array(this.sizeY);
        for (let j = 0; j < this.sizeY; j++) {
            this.canvas[j] = new Array(this.sizeX);
            for (let i = 0; i < this.sizeX; i++) {
                this.canvas[j][i] = new Pixel(null);
            }
        }
    }

    public render(): Canvas {
        vue.clearScreen();
        this.clearCanvas();
        for (const shape of this.shapes) {
            this.renderShape(shape);
        }
        return this;
    }

    public moveSahpeWithIdUp(id: number): void {
        if (this.hasShapeWithId(id)) {
            if (this.getIndexOfShapeWithId(id) === this.canvas.length - 1) {
                try {
                    throw new AlreadyAtFront();
                } catch (error) {
                    console.error(error.toString());
                }
            } else {
                const index = this.getIndexOfShapeWithId(id);
                const temp = this.shapes.splice(index, 1)[0];
                this.shapes.splice(index + 1, 0, temp);
            }
        }
    }

    public moveSahpeWithIdDown(id: number): void {
        if (this.hasShapeWithId(id)) {
            if (this.getIndexOfShapeWithId(id) === 0) {
                try {
                    throw new AlreadyAtBack();
                } catch (error) {
                    console.error(error.toString());
                }
            } else {
                const index = this.getIndexOfShapeWithId(id);
                const temp = this.shapes.splice(index, 1)[0];
                this.shapes.splice(index - 1, 0, temp);
            }
        }
    }

    public moveSahpeWithIdFront(id: number): void {
        if (this.hasShapeWithId(id)) {
            if (this.getIndexOfShapeWithId(id) === this.canvas.length - 1) {
                try {
                    throw new AlreadyAtFront();
                } catch (error) {
                    console.error(error.toString());
                }
            } else {
                const index = this.getIndexOfShapeWithId(id);
                const temp = this.shapes.splice(index, 1)[0];
                this.shapes.splice(this.shapes.length, 0, temp);
            }
        }
    }

    public moveSahpeWithIdBack(id: number): void {
        if (this.hasShapeWithId(id)) {
            if (this.getIndexOfShapeWithId(id) === this.canvas.length - 1) {
                try {
                    throw new AlreadyAtFront();
                } catch (error) {
                    console.error(error.toString());
                }
            } else {
                const index = this.getIndexOfShapeWithId(id);
                const temp = this.shapes.splice(index, 1)[0];
                this.shapes.splice(0, 0, temp);
            }
        }
    }

    private getIndexOfShapeWithId(id: number): number {
        if (this.hasShapeWithId(id)) {
            let i = 0;
            while (this.shapes[i].id !== id && i < this.shapes.length) {
                i++;
            }
            return i;
        }
    }

    private isInCanvas(p: Point): boolean {
        return p.x >= 0 && p.x < this.sizeX
            && p.y >= 0 && p.y < this.sizeY;
    }

    private renderShape(shape: any): void {
        switch (true) {
            case shape instanceof Ellipse:
                this.renderEllipse(shape);
                break;
            case shape instanceof Rectangle:
                this.renderRectangle(shape);
                break;
            case shape instanceof Line:
                this.renderLine(shape);
                break;
            case shape instanceof Point:
                this.renderPoint(shape);
                break;
        }
    }

    private renderEllipse(shape: Ellipse): void {
        for (let j = shape.center.y - shape.radiusY; j <= shape.center.y + shape.radiusY; j++) {
            for (let i = shape.center.x - shape.radiusX; i <= shape.center.x + shape.radiusX; i++) {
                if (this.isInCanvas(
                    new Point(
                        i,
                        j,
                        null,
                        null,
                        null,
                        null))) {
                    if (shape.isInside(
                        new Point(
                            i,
                            j,
                            null,
                            null,
                            null,
                            null))) {
                        this.renderPixel(i, j, shape.fill);
                    }
                }
            }
        }
    }

    private renderRectangle(shape: Rectangle): void {
        for (let j: number = shape.center.y - (shape.height / 2); j <= shape.center.y + (shape.height / 2); j++) {
            for (let i: number = shape.center.x - (shape.width / 2); i <= shape.center.x + (shape.width / 2); i++) {
                if (this.isInCanvas(
                    new Point(
                        i,
                        j,
                        null,
                        null,
                        null,
                        null))) {
                    this.renderPixel(i, j, shape.fill);
                }
            }
        }
    }

    private renderLine(shape: Line): void {
        if (shape.p1.x === shape.p2.x) {
            for (let j = Math.min(shape.p1.y, shape.p2.y); j <= Math.max(shape.p1.y, shape.p2.y); j++) {
                this.renderPixel(shape.p1.x, j, shape.fill);
            }
        } else {
            const m = ((shape.p1.y - shape.p2.y) / (shape.p1.x - shape.p2.x));
            const p = shape.p1.y - (m * shape.p1.x);
            for (let j = Math.min(shape.p1.y, shape.p2.y); j <= Math.max(shape.p1.y, shape.p2.y); j++) {
                for (let i = Math.min(shape.p1.x, shape.p2.x); i <= Math.max(shape.p1.x, shape.p2.x); i++) {
                    if ((Math.abs(j - (m * i) - p) / Math.sqrt(1 + Math.pow(m, 2))) <= 0.5) {
                        this.renderPixel(i, j, shape.fill);
                    }
                }
            }
        }
    }

    private renderPoint(shape: Point): void {
        if (this.isInCanvas(
            new Point(
                shape.center.x,
                shape.center.y,
                null,
                null,
                null,
                null))) {
            this.renderPixel(shape.center.x, shape.center.y, shape.fill);
        }
    }

    private renderPixel(i: number, j: number, value: string): void {
        if (i >= 0 && i < this.sizeX && j >= 0 && j < this.sizeY) {
                this.canvas[Math.round(j)][Math.round(i)].value = value;
        }
    }
}
