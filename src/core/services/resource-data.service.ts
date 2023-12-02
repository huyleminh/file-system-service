export class GetFileDataDto {
    constructor(public filePath: string) {}
}

export interface IResourceDataService {
    getFileDataAsync(dto: GetFileDataDto): Promise<{ content: string; type: string }>;
}
