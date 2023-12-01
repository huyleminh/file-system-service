import { Inject, Injectable } from "@nestjs/common";
import { HTTP_CODE } from "src/common/constants";
import { SimpleBadRequestException, SimpleNotFoundException } from "src/common/exceptions";
import { RESOURCE_TYPE_ENUM } from "src/core/entities";
import { DOMAIN_REPOSITORY_SYMBOL, IResourceRepository, IResourceDataRepository } from "src/core/repositories";
import { GetFileDataDto, IResourceDataService } from "src/core/services";

@Injectable()
export class ResourceDataService implements IResourceDataService {
    constructor(
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceRepository) private readonly _resourceRepo: IResourceRepository,
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceDataRepository)
        private readonly _resourceDataRepo: IResourceDataRepository,
    ) {}

    async getFileDataAsync(dto: GetFileDataDto): Promise<{ content: string; type: string }> {
        // find resource id by path
        const resource = await this._resourceRepo.findResourceByPath(dto.filePath);

        // the parent folder of the destination PATH does not exist
        if (!resource) {
            throw new SimpleNotFoundException(HTTP_CODE.notFound, `Path '${dto.filePath}' does not exist`);
        }

        if (resource.type === RESOURCE_TYPE_ENUM.FOLDER) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `Path '${dto.filePath}' is not a file`);
        }

        // query the content
        const resData = await this._resourceDataRepo.findDataByResourceId(resource.id);

        return { content: resData!.data, type: resData!.dataType };
    }
}
