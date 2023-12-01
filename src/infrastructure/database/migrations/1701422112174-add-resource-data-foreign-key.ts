import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResourceDataForeignKey1701422112174 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            ALTER TABLE "resource_data" ADD CONSTRAINT fk_resource_data_resource FOREIGN KEY ("resource_id") REFERENCES "resources" ("id") ON DELETE CASCADE;
        `);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("resource_data", "fk_resource_data_resource");
    }
}
