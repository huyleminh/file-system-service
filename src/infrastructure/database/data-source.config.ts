import { DataSource, DataSourceOptions } from "typeorm";
import { DATABASE_CONFIG } from "../configs";
import {
    AddResourceDataForeignKey1701422112174,
    CreateResourceDataTable1701421958686,
    CreateResourceTable1701421451053,
} from "./migrations";
import { ResourceDataSchema, ResourceSchema } from "./schemas";

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: DATABASE_CONFIG.host,
    port: DATABASE_CONFIG.port,
    username: DATABASE_CONFIG.username,
    password: DATABASE_CONFIG.password,
    database: DATABASE_CONFIG.dbName,
    poolSize: 10,
    synchronize: false, // disable sync between entity class and db
    entities: [ResourceSchema, ResourceDataSchema],
    migrations: [
        CreateResourceTable1701421451053,
        CreateResourceDataTable1701421958686,
        AddResourceDataForeignKey1701422112174,
    ],
};

// It hasn't established a connection to postgres db because the `intialize()` function still wasn't be called
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
