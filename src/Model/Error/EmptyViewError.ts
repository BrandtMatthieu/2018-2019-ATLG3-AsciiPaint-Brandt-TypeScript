export class EmptyView extends Error {
    constructor() {
        super(`There are canvases in this view.`);
        this.name = `EmptyView`;
    }
}
