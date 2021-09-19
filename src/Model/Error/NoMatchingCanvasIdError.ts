export class NoMatchingCanvasId extends Error {
    constructor() {
        super(`There are no canvas matching this id.`);
        this.name = `NoMatchingCanvasId`;
    }
}
