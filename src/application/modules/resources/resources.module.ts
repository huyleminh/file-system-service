import { Module } from "@nestjs/common";
import { ApplicationServiceModule } from "src/infrastructure/services/application-service.module";
import { ResourcesController } from "./resources.controller";

@Module({
    imports: [ApplicationServiceModule],
    controllers: [ResourcesController],
    providers: [],
})
export class ResourceModule {}
