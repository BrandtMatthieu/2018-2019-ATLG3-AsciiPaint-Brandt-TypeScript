export class AlreadyAtBack extends Error {
    constructor() {
        super(`This shape is already at the back of this canvas.`);
        this.name = `AlreadyAtBack`;
    }
}
