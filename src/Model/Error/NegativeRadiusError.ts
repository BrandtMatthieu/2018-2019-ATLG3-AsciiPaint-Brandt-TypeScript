export class NegativeRadiusLength extends Error {
    constructor() {
        super(`Radius cannot be smaller than 0.`);
        this.name = `NegativeRadiusLength`;
    }
}
