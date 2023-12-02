import { Resource } from "../entities";

export class CreateResourceDto {
    constructor(
        public path: string,
        public name: string,
        public data?: string,
        // public options?: { createMissingFolder: boolean },
    ) {}
}

export class ListFolderChildrenDto {
    constructor(public path: string) {}
}

export interface IResourceService {
    createResourceAsync(dto: CreateResourceDto): Promise<Resource>;
    listFolderChildrenAsync(dto: ListFolderChildrenDto): Promise<Resource[]>;
}
