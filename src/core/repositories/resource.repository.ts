import { Resource } from "../entities";
import { IGenericRepository } from "./generic.repository";

export interface IResourceRepository extends IGenericRepository<Resource> {
    findResourceByPath(pathname: string): Promise<Resource | null>;
    findResourceByParentAndName(parentId: number, name: string): Promise<Resource | null>;
    findChildrenByParent(parentId: number): Promise<Resource[]>;
    findAncestry(resourceId: number): Promise<Resource[]>;
    updateManyResourceSize(list: Resource[]): Promise<any>;
}
