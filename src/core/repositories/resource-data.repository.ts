import { Resource, ResourceData } from "../entities";
import { IGenericRepository } from "./generic.repository";

export interface IResourceDataRepository extends IGenericRepository<ResourceData> {
    findDataByResourceId(resourceId: number): Promise<ResourceData | null>;
}
