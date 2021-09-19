export class TooFewArguments extends Error {
    constructor(expectedCount: number, provided: number) {
        super(`Too few arguments provided.\nExpected at least ${expectedCount} arguments, but got ${provided}.`);
        this.name = `TooFewArguments`;
    }
}
