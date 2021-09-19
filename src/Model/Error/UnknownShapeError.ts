export class UnknownShape extends Error {
    constructor() {
        super(`Unknow shape.\nTry running "help shapes" to see all avaliable shapes.`);
        this.name = `UnknownShape`;
    }
}
