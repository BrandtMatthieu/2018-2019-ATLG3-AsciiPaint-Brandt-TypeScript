import Canvas from "./Canvas";

import { EmptyView } from "./Error/EmptyViewError";
import { NegativeCanvasSize } from "./Error/NegativeCanvasSizeError";
import { NoMatchingCanvasId } from "./Error/NoMatchingCanvasIdError";
import { UnknownColor } from "./Error/UnknownColorError";

export default class Viewport {

    private _canvases: Canvas[];
    private _currentCanvasId: number;
    private _canvasIdCount: number;
    private _defaultSizeX: number = 81;
    private _defaultSizeY: number = 51;
    private _defaultValue: string = `.`;
    private _defaultGrid: boolean = false;
    private _defaultBorder: boolean = true;

    constructor() {
        this._canvases = [];
        this._canvasIdCount = -1;
        this._currentCanvasId = -1;
        this.addCanvas(
            this.defaultSizeX,
            this.defaultSizeY,
            this.defaultValue,
            this.defaultGrid,
            this.defaultBorder,
            this.canvasIdCount + 1);
    }

    get canvases(): Canvas[] {
        return this._canvases;
    }

    set canvases(canvases: Canvas[]) {
        this._canvases = canvases;
    }

    get currentCanvasId(): number {
        return this._canvasIdCount;
    }

    set currentCanvasId(currentCanvasId: number) {
        if (currentCanvasId < 0 || currentCanvasId > this.canvases.length - 1) {
            try {
                throw new NoMatchingCanvasId();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._currentCanvasId = currentCanvasId;
        }
    }

    get canvasIdCount(): number {
        return this._canvasIdCount;
    }

    set canvasIdCount(canvasIdCount: number) {
        if (canvasIdCount < 0) {
            try {
                throw new NoMatchingCanvasId();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._canvasIdCount = canvasIdCount;
        }
    }

    get defaultSizeX(): number {
        return this._defaultSizeX;
    }

    set defaultSizeX(defaultSizeX: number) {
        if (defaultSizeX < 0) {
            try {
                throw new NegativeCanvasSize();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._defaultSizeX = defaultSizeX;
        }
    }

    get defaultSizeY(): number {
        return this._defaultSizeY;
    }

    set defaultSizeY(defaultSizeY: number) {
        if (defaultSizeY < 0) {
            try {
                throw new NegativeCanvasSize();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._defaultSizeY = defaultSizeY;
        }
    }

    get defaultValue(): string {
        return this._defaultValue;
    }

    set defaultValue(defaultValue: string) {
        if (defaultValue === undefined || defaultValue === null || defaultValue.length !== 1) {
            try {
                throw new UnknownColor();
            } catch (error) {
                console.error(error.toString());
            }
        } else {
            this._defaultValue = defaultValue;
        }
    }

    get defaultGrid(): boolean {
        return this._defaultGrid;
    }

    set defaultGrid(defaultGrid: boolean) {
        this._defaultGrid = defaultGrid;
    }

    get defaultBorder(): boolean {
        return this._defaultBorder;
    }

    set defaultBorder(defaultBorder: boolean) {
        this._defaultBorder = defaultBorder;
    }

    public addCanvas(
        sizeX: number,
        sizeY: number,
        defaultValue: string,
        grid: boolean,
        border: boolean,
        id: number): void {
        if (!sizeX) {
            sizeX = this.defaultSizeX;
        }
        if (!sizeY) {
            sizeY = this.defaultSizeY;
        }
        if (sizeX < 0 || sizeY < 0) {
            try {
                throw new NegativeCanvasSize();
            } catch (error) {
                console.error(error.toString());
            }
        }
        this.canvases.push(
            new Canvas(
                sizeX ? sizeX : this.defaultSizeX,
                sizeY ? sizeY : this.defaultSizeY,
                defaultValue ? defaultValue : this.defaultValue,
                grid ? grid : this.defaultGrid,
                border ? border : this.defaultBorder,
                id));
        this.canvasIdCount++;
        this.currentCanvasId = this.canvasIdCount;
    }

    public getCurrentCanvas(): Canvas {
        return this.canvases[this.currentCanvasId];
    }

    public getCanvasWithId(id: number) {
        if (this.hasCanvasWithId(id)) {
            return this.canvases[id];
        } else {
            try {
                throw new NoMatchingCanvasId();
            } catch (error) {
                console.error(error.toString());
            }
        }
    }

    public clearCurrentCanvas(): void {
        this.canvases[this.currentCanvasId] = new Canvas(
            this.getCurrentCanvas().sizeX,
            this.getCurrentCanvas().sizeY,
            this.getCurrentCanvas().defaultValue,
            this.getCurrentCanvas().grid,
            this.getCurrentCanvas().border,
            this.getCurrentCanvas().id);
    }

    public listCanvases(): void {
        if (this.canvases.length > 0) {
            console.log(`View | Canvases for the view${this.canvases.length > 0 ? ` (${this.canvases.length} canvases found)` : ``}`);
            for (const canvas of this.canvases) {
                console.log(canvas.toString());
            }
        } else {
            try {
                throw new EmptyView();
            } catch (error) {
                console.error(error.toString());
            }
        }
    }

    public hasCanvasWithId(id: number): boolean {
        for (const canvas of this.canvases) {
            if (canvas.id === id) {
                return true;
            }
        }
        return false;
    }

    public toString(): string {
        return `View | Canvases count: ${this.canvases.length}`;
    }
}
