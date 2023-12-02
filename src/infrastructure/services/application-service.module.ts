import { Module } from "@nestjs/common";
import { APPLICATION_SERVICE_SYMBOL } from "src/core/services";
import { DomainRepositoryModule } from "../repositories";
import { ResourceDataService } from "./resource-data.service";
import { ResourceService } from "./resource.service";

@Module({
    imports: [DomainRepositoryModule],
    providers: [
        { provide: APPLICATION_SERVICE_SYMBOL.resourceService, useClass: ResourceService },
        { provide: APPLICATION_SERVICE_SYMBOL.resourceDataService, useClass: ResourceDataService },
    ],
    exports: [
        { provide: APPLICATION_SERVICE_SYMBOL.resourceService, useClass: ResourceService },
        { provide: APPLICATION_SERVICE_SYMBOL.resourceDataService, useClass: ResourceDataService },
    ],
})
export class ApplicationServiceModule {}
