export class TooManyArguments extends Error {
    constructor(expectedCount: number, provided: number) {
        super(`Too many arguments provided.\nExpected maximum ${expectedCount} arguments, but got ${provided}.`);
        this.name = `TooManyArguments`;
    }
}
