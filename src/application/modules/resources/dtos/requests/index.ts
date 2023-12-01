export class CreateResourceBodyDto {
    constructor(
        public path: string,
        public name: string,
        // public options: { createMissingFolder: boolean },
        public data?: string,
    ) {}
}

export class GetFileContentQueryDto {
    constructor(public filePath: string) {}
}
