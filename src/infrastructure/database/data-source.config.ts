import { DataSource, DataSourceOptions } from "typeorm";
import { DATABASE_CONFIG } from "../configs";
import {
    AddResourceDataForeignKey1701422112174,
    CreateResourceDataTable1701421958686,
    CreateResourceTable1701421451053,
} from "./migrations";
import { InsertRootResource1701442794383 } from "./migrations/1701442794383-insert-root-resource";
import { AddResourceParentForeignKey1701494898469 } from "./migrations/1701494898469-add-resource-parent-foreign-key";
import { ResourceDataSchema, ResourceSchema } from "./schemas";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    url: DATABASE_CONFIG.url,
    poolSize: 10,
    synchronize: false, // disable sync between entity class and db
    entities: [ResourceSchema, ResourceDataSchema],
    migrations: [
        CreateResourceTable1701421451053,
        CreateResourceDataTable1701421958686,
        AddResourceDataForeignKey1701422112174,
        InsertRootResource1701442794383,
        AddResourceParentForeignKey1701494898469,
    ],
};

// It hasn't established a connection to postgres db because the `intialize()` function still wasn't be called
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
