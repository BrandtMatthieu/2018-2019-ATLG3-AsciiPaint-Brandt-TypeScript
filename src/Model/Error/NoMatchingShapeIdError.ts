export class NoMatchingShapeId extends Error {
    constructor() {
        super(`There are no shape matching this id.`);
        this.name =  `NoMatchingShapeId`;
    }
}
