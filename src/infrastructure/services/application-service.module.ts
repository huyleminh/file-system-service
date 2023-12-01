import { Module } from "@nestjs/common";
import { APPLICATION_SERVICE_SYMBOL } from "src/core/services";
import { ResourceService } from "./resource.service";
import { DomainRepositoryModule } from "../repositories";

@Module({
    imports: [DomainRepositoryModule],
    providers: [{ provide: APPLICATION_SERVICE_SYMBOL.resourceService, useClass: ResourceService }],
    exports: [{ provide: APPLICATION_SERVICE_SYMBOL.resourceService, useClass: ResourceService }],
})
export class ApplicationServiceModule {}
