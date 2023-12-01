import { ResourceData } from "src/core/entities";
import { EntitySchema } from "typeorm";

export const ResourceDataSchema = new EntitySchema<ResourceData>({
    name: "ResourceData",
    tableName: "resources",
    target: ResourceData,
    columns: {
        id: { type: Number, generated: true, primary: true },
        data: { type: "text", nullable: false },
        dataType: { type: "varchar", name: "data_type" },
        resourceId: { type: "integer", name: "resource_id" },
        createdAt: { name: "created_at", type: "timestamp with time zone", createDate: true },
        updatedAt: { name: "updated_at", type: "timestamp with time zone", updateDate: true },
    },
    // relations: {
    //     resourceId: {
    //         type: "one-to-one",
    //         target: "resources",
    //         onDelete: "CASCADE"
    //     },
    // },
});
