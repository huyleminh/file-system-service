export class ResourceData {
    constructor(
        public id: number,
        public data: string,
        public dataType: string,
        public resourceId: number,
        public createdAt: Date,
        public updatedAt: Date,
    ) {}
}
