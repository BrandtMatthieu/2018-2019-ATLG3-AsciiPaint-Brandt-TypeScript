export class NoArgumuments extends Error {
    constructor(expectedCount: number) {
        super(`No arguments provided.\nExpected at least ${expectedCount} arguments, but didn't got any.`);
        this.name = `NoArgumuments`;
    }
}
