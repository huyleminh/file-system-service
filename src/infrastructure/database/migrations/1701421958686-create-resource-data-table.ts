import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResourceDataTable1701421958686 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            CREATE TABLE "resource_data" (
                "id" serial PRIMARY KEY,
                "data" text NOT NULL,
                "data_type" varchar DEFAULT 'text',
                "resource_id" integer NOT NULL,
                "created_at" timestamptz DEFAULT (now()),
                "updated_at" timestamptz DEFAULT (now())
            );
        `);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("resource_data", true);
    }
}
