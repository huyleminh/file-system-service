import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreatedResponse } from "src/application/response";
import { APPLICATION_SERVICE_SYMBOL, CreateResourceDto, IResourceService } from "src/core/services";
import { CreateResourceBodyDto } from "./dtos/requests";
import { CreateResourceValidationPipe } from "./pipes/create-resource.pipe";
import { sanitizedPathname } from "src/common/utils";

@Controller("v1/resources")
export class ResourcesController {
    constructor(
        @Inject(APPLICATION_SERVICE_SYMBOL.resourceService) private readonly _resourceService: IResourceService,
    ) {}

    @Post()
    async createResource(@Body(new CreateResourceValidationPipe()) body: CreateResourceBodyDto) {
        const { path, name, data } = body;
        await this._resourceService.createResourceAsync(new CreateResourceDto(sanitizedPathname(path), name, data));
        return new CreatedResponse();
    }
}
