export class EmptyCanvas extends Error {
    constructor() {
        super(`There are no shapes in this canvas.`);
        this.name = `EmptyCanvas`;
    }
}
