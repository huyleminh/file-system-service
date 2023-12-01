import { Module } from "@nestjs/common";
import { DOMAIN_REPOSITORY_SYMBOL } from "src/core/repositories";
import { ResourceRepository } from "./resource.repository";
import { ResourceDataRepository } from "./resource-data.repository";

@Module({
    providers: [
        { provide: DOMAIN_REPOSITORY_SYMBOL.resourceRepository, useClass: ResourceRepository },
        { provide: DOMAIN_REPOSITORY_SYMBOL.resourceDataRepository, useClass: ResourceDataRepository },
    ],
    exports: [
        { provide: DOMAIN_REPOSITORY_SYMBOL.resourceRepository, useClass: ResourceRepository },
        { provide: DOMAIN_REPOSITORY_SYMBOL.resourceDataRepository, useClass: ResourceDataRepository },
    ],
})
export class DomainRepositoryModule {}
