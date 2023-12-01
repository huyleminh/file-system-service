import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { ResourceData } from "src/core/entities";
import { IResourceDataRepository } from "src/core/repositories";
import { DataSource } from "typeorm";
import { ResourceDataSchema } from "../database/schemas";
import { GenericRepository } from "./generic.repository";

@Injectable()
export class ResourceDataRepository extends GenericRepository<ResourceData> implements IResourceDataRepository {
    constructor(@InjectDataSource() _dataSource: DataSource) {
        super(_dataSource.getRepository(ResourceDataSchema));
    }

    async findDataByResourceId(resourceId: number): Promise<ResourceData | null> {
        return await this._repository.findOneBy({ resourceId });
    }
}
