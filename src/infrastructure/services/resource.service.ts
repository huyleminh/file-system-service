import { Inject, Injectable } from "@nestjs/common";
import { HTTP_CODE } from "src/common/constants";
import { SimpleBadRequestException } from "src/common/exceptions";
import { RESOURCE_TYPE_ENUM, Resource } from "src/core/entities";
import { DOMAIN_REPOSITORY_SYMBOL, IResourceDataRepository, IResourceRepository } from "src/core/repositories";
import { CreateResourceDto, IResourceService } from "src/core/services";

@Injectable()
export class ResourceService implements IResourceService {
    constructor(
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceRepository) private readonly _resourceRepo: IResourceRepository,
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceDataRepository)
        private readonly _resourceDataRepo: IResourceDataRepository,
    ) {}

    async createResourceAsync(dto: CreateResourceDto) {
        const { path, name, data } = dto;

        // find resource id by path
        const parent = await this._resourceRepo.findResourceByPath(path);

        // the parent folder of the destination PATH does not exist
        if (!parent) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `Parent ${path} does not exist`);
        }

        // check existing file/folder name
        const oldResource = await this._resourceRepo.findResourceByParentAndName(parent.id, name);
        if (oldResource) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `'${name}' is existed at path ${path}`);
        }

        // create
        const resource = await this._resourceRepo.saveRecord({
            name,
            parentId: parent.id,
            type: data ? RESOURCE_TYPE_ENUM.FILE : RESOURCE_TYPE_ENUM.FOLDER,
            size: data ? data.length : 0,
        });

        // save data if present
        if (data) {
            await this._resourceDataRepo.saveRecord({ data, resourceId: resource.id });
        }

        return resource;
    }
}
