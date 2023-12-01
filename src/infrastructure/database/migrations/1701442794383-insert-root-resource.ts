import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertRootResource1701442794383 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            INSERT INTO "resources" ("name", "parent_id", "size", "type") VALUES ('root', NULL, 0, 'folder');
        `);
    }

    async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`
            DELETE FROM "resources" WHERE "parent_id" IS NULL;
        `);
    }
}
