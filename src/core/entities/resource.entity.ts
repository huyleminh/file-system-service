export class Resource {
    constructor(
        public id: number,
        public name: string,
        public parentId: number,
        public size: number,
        public type: string,
        public createdAt: Date,
    ) {}
}

export enum RESOURCE_TYPE_ENUM {
    FILE = "file",
    FOLDER = "folder",
}
