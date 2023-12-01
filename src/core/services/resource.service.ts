export class CreateResourceDto {
    constructor(
        public path: string,
        public name: string,
        public data?: string,
        // public options?: { createMissingFolder: boolean },
    ) {}
}

export interface IResourceService {
    createResourceAsync(dto: CreateResourceDto): Promise<any>;
}
