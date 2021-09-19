export class UnknownCommand extends Error {
    constructor() {
        super(`Unknow command.\nTry running  "help" to see all avaliables commands.`);
        this.name = `UnknownCommand`;
    }
}
