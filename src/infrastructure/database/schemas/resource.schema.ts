import { Resource } from "src/core/entities";
import { EntitySchema } from "typeorm";

export const ResourceSchema = new EntitySchema<Resource>({
    name: "Resource",
    tableName: "resources",
    target: Resource,
    columns: {
        id: { type: Number, generated: true, primary: true },
        name: { type: "varchar", nullable: false },
        parentId: { type: "integer", name: "parent_id" },
        size: { type: "integer", default: 0 },
        type: { type: "varchar", nullable: false },
        createdAt: { name: "created_at", type: "timestamp with time zone", createDate: true },
    },
});
