export class NegativeCanvasSize extends Error {
    constructor() {
        super(`Canvas size cannot be smaller than 0.`);
        this.name = `NegativeCanvasSize`;
    }
}
