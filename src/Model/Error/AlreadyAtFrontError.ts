export class AlreadyAtFront extends Error {
    constructor() {
        super(`This shape is already at the front of this canvas.`);
        this.name = `AlreadyAtFront`;
    }
}
