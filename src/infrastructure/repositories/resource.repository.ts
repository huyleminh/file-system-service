import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { Resource } from "src/core/entities";
import { IResourceRepository } from "src/core/repositories";
import { DataSource } from "typeorm";
import { ResourceSchema } from "../database/schemas";
import { GenericRepository } from "./generic.repository";

@Injectable()
export class ResourceRepository extends GenericRepository<Resource> implements IResourceRepository {
    constructor(@InjectDataSource() _dataSource: DataSource) {
        super(_dataSource.getRepository(ResourceSchema));
    }

    async findResourceByPath(pathname: string): Promise<Resource | null> {
        const pathToken = pathname.replace(/^\/+/, "/").split("/");
        const folderName = pathToken[1] ? pathToken[1] : "root";
        const pathToMatch = folderName === "root" ? "/root" : `${pathname}`;
        const where = folderName === "root" ? "IS NULL" : `= 1`;

        const result = await this.executeRawQuery(
            `
                WITH RECURSIVE subtree AS (
                    SELECT "id", "name", "parent_id", "size", "type", "created_at", '/' || "name" as "pathname"
                    FROM "resources"
                    WHERE "name" = $1 AND "parent_id" ${where}
                    UNION ALL
                        SELECT res.id, res.name, res.parent_id, res.size, res.type, res.created_at, "pathname" || '/' || res.name
                        FROM "resources" res
                        INNER JOIN subtree sub ON res.parent_id = sub.id
                ) SELECT "id", "name", "parent_id" as "parentId", "size", "type", "created_at" as "createdAt", "pathname" FROM subtree WHERE "pathname" = $2;
            `,
            [folderName, pathToMatch],
        );

        return result[0] ?? null;
    }

    async findResourceByParentAndName(parentId: number, name: string): Promise<Resource | null> {
        return this._repository.findOneBy({ parentId, name });
    }

    async findChildrenByParent(parentId: number): Promise<Resource[]> {
        const where = !parentId ? "IS NULL" : `= ${parentId}`;

        return this.executeRawQuery(
            `
                SELECT "id", "name", "parent_id" as "parentId", "size", "type", "created_at" as "createdAt"
                FROM "resources"
                WHERE "id" ${where}
                UNION ALL
                SELECT "id", "name", "parent_id" as "parentId", "size", "type", "created_at" as "createdAt"
                FROM "resources"
                WHERE "parent_id" ${where}
            `,
        );
    }

    async findAncestry(resourceId: number): Promise<Resource[]> {
        const result = await this.executeRawQuery(
            `
                WITH RECURSIVE subtree AS (
                    SELECT "id", "name", "parent_id", "size", "type", "created_at"
                    FROM "resources"
                    WHERE "id" = $1
                    UNION ALL
                        SELECT res.id, res.name, res.parent_id, res.size, res.type, res.created_at
                        FROM "resources" res
                        INNER JOIN subtree sub ON res.id = sub.parent_id
                ) SELECT "id", "name", "parent_id" as "parentId", "size", "type", "created_at" as "createdAt" FROM subtree;
            `,
            [resourceId],
        );

        // remove current resource
        (result as Resource[]).shift();

        return result;
    }

    async updateManyResourceSize(list: Resource[]): Promise<any> {
        const values = list.map((item) => `(${item.id}, ${item.size})`).join(",");

        const result = await this.executeRawQuery(
            `
                UPDATE "resources" as r SET "size" = "temp".size
                FROM (
                    VALUES ${values}
                ) AS "temp"("id", "size")
                WHERE r.id = "temp".id;
            `,
        );
        return result;
    }
}
