import { MigrationInterface, QueryRunner } from "typeorm";

class Init1621726693087 implements MigrationInterface {
  name = "init1621726693087";

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a9e4b690ab0b3d9e914878f6bf"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "owner_id"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "content_id"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP CONSTRAINT "UQ_5496a36f94befd2cbf3a5eb4560"`
    );
    await queryRunner.query(`ALTER TABLE "user_metrics" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "article_count"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "created_at"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "updated_at"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "ownerId" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "content" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "userId" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD CONSTRAINT "UQ_4cbf5a81ec06c7698ff66f31911" UNIQUE ("userId")`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "articleCount" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7c5cf03df2dce6ca688d735782" ON "user_metrics" ("userId", "articleCount") `
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7c5cf03df2dce6ca688d735782"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "updatedAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "createdAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP COLUMN "articleCount"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" DROP CONSTRAINT "UQ_4cbf5a81ec06c7698ff66f31911"`
    );
    await queryRunner.query(`ALTER TABLE "user_metrics" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "target_metrics" DROP COLUMN "updatedAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" DROP COLUMN "createdAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" DROP COLUMN "updatedAt"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" DROP COLUMN "createdAt"`
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "content"`);
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "ownerId"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "article_count" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD "user_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user_metrics" ADD CONSTRAINT "UQ_5496a36f94befd2cbf3a5eb4560" UNIQUE ("user_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "target_metrics" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "problem_metrics" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "content_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "owner_id" character varying NOT NULL`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a9e4b690ab0b3d9e914878f6bf" ON "user_metrics" ("user_id", "article_count") `
    );
  }
}

export default Init1621726693087;
