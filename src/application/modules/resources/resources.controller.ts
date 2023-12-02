import { Body, Controller, Delete, Get, HttpCode, Inject, Post, Query } from "@nestjs/common";
import { CreatedResponse, DataResponse } from "src/application/response";
import { sanitizedPathname } from "src/common/utils";
import {
    APPLICATION_SERVICE_SYMBOL,
    CreateResourceDto,
    GetFileDataDto,
    IResourceDataService,
    IResourceService,
    ListFolderChildrenDto,
    RemoveMultipleResourceDto,
} from "src/core/services";
import {
    CreateResourceBodyDto,
    DeleteMultipleResourceQueryDto,
    GetFileContentQueryDto,
    GetFolderItemsQueryDto,
} from "./dtos/requests";
import { CreateResourceValidationPipe } from "./pipes/create-resource.pipe";
import { GetFileContentValidationPipe } from "./pipes/get-file-content.pipe";
import { GetFolderItemsValidationPipe } from "./pipes/get-folder-items.pipe";
import { DeleteMultipleResourceValidationPipe } from "./pipes/delete-multiple-resource.pipe";

@Controller("v1/resources")
export class ResourcesController {
    constructor(
        @Inject(APPLICATION_SERVICE_SYMBOL.resourceService) private readonly _resourceService: IResourceService,
        @Inject(APPLICATION_SERVICE_SYMBOL.resourceDataService)
        private readonly _resourceDataService: IResourceDataService,
    ) {}

    @Post()
    @HttpCode(201)
    async createResource(@Body(new CreateResourceValidationPipe()) body: CreateResourceBodyDto) {
        const { path, name, data } = body;
        await this._resourceService.createResourceAsync(new CreateResourceDto(sanitizedPathname(path), name, data));
        return new CreatedResponse();
    }

    @Get("content")
    async getFileContent(@Query(new GetFileContentValidationPipe()) query: GetFileContentQueryDto) {
        const { path: filePath } = query;
        const content = await this._resourceDataService.getFileDataAsync(
            new GetFileDataDto(sanitizedPathname(filePath)),
        );

        return new DataResponse(content);
    }

    @Get("children")
    async getFolderItems(@Query(new GetFolderItemsValidationPipe()) query: GetFolderItemsQueryDto) {
        const items = await this._resourceService.listFolderChildrenAsync(new ListFolderChildrenDto(query.path));
        const mappedItems = items.map(({ id, createdAt, name, type, size }) => ({ id, createdAt, name, type, size }));
        const result = {
            root: mappedItems[0],
            children: mappedItems.slice(1),
        };
        return result;
    }

    @Delete("multiple")
    async deleteMultipleRersource(
        @Query(new DeleteMultipleResourceValidationPipe()) query: DeleteMultipleResourceQueryDto,
    ) {
        const { pathList } = query;
        const sanitizedPathList = pathList.map((path) => sanitizedPathname(path));

        const data = await this._resourceService.removeMultipleResourceAsync(new RemoveMultipleResourceDto(sanitizedPathList));
        return new DataResponse(data);
    }
}
