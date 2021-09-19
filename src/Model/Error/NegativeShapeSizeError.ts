export class NegativeShapeSize extends Error {
    constructor() {
        super(`Shape size cannot be smaller than 0.`);
        this.name = `NegativeShapeSize`;
    }
}
