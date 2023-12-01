import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateResourceTable1701421451053 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "resources" (
                "id" serial PRIMARY KEY,
                "name" varchar NOT NULL,
                "parent_id" integer,
                "size" integer DEFAULT 0,
                "type" varchar NOT NULL,
                "created_at" timestamptz DEFAULT (now())
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("resources", true);
    }
}
