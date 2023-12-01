import { Resource } from "../entities";
import { IGenericRepository } from "./generic.repository";

export interface IResourceRepository extends IGenericRepository<Resource> {
    findResourceByPath(pathname: string): Promise<Resource | null>;
    findResourceByParentAndName(parentId: number, name: string): Promise<Resource | null>;
}
