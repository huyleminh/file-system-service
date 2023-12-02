import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResourceParentForeignKey1701494898469 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            ALTER TABLE "resources" ADD CONSTRAINT fk_resource_parent FOREIGN KEY ("parent_id") REFERENCES "resources" ("id") ON DELETE CASCADE;
        `);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("resources", "fk_resource_parent");
    }
}
