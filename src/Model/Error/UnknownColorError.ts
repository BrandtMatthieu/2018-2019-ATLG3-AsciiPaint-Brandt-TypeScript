export class UnknownColor extends Error {
    constructor() {
        super(`Unknow color.\nShape has not been created, probably because of a missing parameter.`);
        this.name = `UnknownColor`;
    }
}
