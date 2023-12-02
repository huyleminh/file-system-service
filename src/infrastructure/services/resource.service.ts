import { Inject, Injectable } from "@nestjs/common";
import { HTTP_CODE } from "src/common/constants";
import { SimpleBadRequestException, SimpleNotFoundException } from "src/common/exceptions";
import { RESOURCE_TYPE_ENUM, Resource } from "src/core/entities";
import { DOMAIN_REPOSITORY_SYMBOL, IResourceDataRepository, IResourceRepository } from "src/core/repositories";
import { CreateResourceDto, IResourceService, ListFolderChildrenDto } from "src/core/services";

@Injectable()
export class ResourceService implements IResourceService {
    constructor(
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceRepository) private readonly _resourceRepo: IResourceRepository,
        @Inject(DOMAIN_REPOSITORY_SYMBOL.resourceDataRepository)
        private readonly _resourceDataRepo: IResourceDataRepository,
    ) {}

    async createResourceAsync(dto: CreateResourceDto) {
        const { path, name, data } = dto;

        const parent = await this._resourceRepo.findResourceByPath(path);

        // the destination PATH does not exist
        if (!parent) {
            throw new SimpleNotFoundException(HTTP_CODE.notFound, `Parent '${path}' does not exist`);
        }

        if (parent.type === RESOURCE_TYPE_ENUM.FILE) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `Path '${path}' is not a folder`);
        }

        // check existing file/folder name
        const oldResource = await this._resourceRepo.findResourceByParentAndName(parent.id, name);
        if (oldResource) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `'${name}' is existed at path '${path}'`);
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

        // find all parent of new resource and update their size
        // ex: find ancestry of 3
        //  tree: root -> 1 -> 2 -> 3
        //  result: 2 -> 1 -> root
        const ancestry = await this._resourceRepo.findAncestry(resource.id);

        if (ancestry.length > 0) {
            for (let item of ancestry) {
                item.size += resource.size;
            }

            // create bulk update
            await this._resourceRepo.updateManyResourceSize(ancestry);
        }

        return resource;
    }

    async listFolderChildrenAsync(dto: ListFolderChildrenDto): Promise<Resource[]> {
        const resource = await this._resourceRepo.findResourceByPath(dto.path);

        // the destination PATH does not exist
        if (!resource) {
            throw new SimpleNotFoundException(HTTP_CODE.notFound, `Path '${dto.path}' does not exist`);
        }

        if (resource.type === RESOURCE_TYPE_ENUM.FILE) {
            throw new SimpleBadRequestException(HTTP_CODE.badRequest, `Path '${dto.path}' is not a folder`);
        }

        return await this._resourceRepo.findChildrenByParent(resource.id);
    }
}
