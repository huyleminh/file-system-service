import { Body, Controller, Get, HttpCode, Inject, Post, Query } from "@nestjs/common";
import { CreatedResponse, DataResponse } from "src/application/response";
import { sanitizedPathname } from "src/common/utils";
import {
    APPLICATION_SERVICE_SYMBOL,
    CreateResourceDto,
    GetFileDataDto,
    IResourceDataService,
    IResourceService,
} from "src/core/services";
import { CreateResourceBodyDto, GetFileContentQueryDto } from "./dtos/requests";
import { CreateResourceValidationPipe } from "./pipes/create-resource.pipe";
import { GetFileContentValidationPipe } from "./pipes/get-file-content.pipe";

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
        const { filePath } = query;
        const content = await this._resourceDataService.getFileDataAsync(
            new GetFileDataDto(sanitizedPathname(filePath)),
        );

        return new DataResponse(content);
    }
}
