export class CreateResourceBodyDto {
    constructor(
        public path: string,
        public name: string,
        // public options: { createMissingFolder: boolean },
        public data?: string,
    ) {}
}

export class GetFileContentQueryDto {
    constructor(public path: string) {}
}

export class GetFolderItemsQueryDto {
    constructor(public path: string) {}
}
