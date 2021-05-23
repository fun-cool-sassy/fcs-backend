import { MigrationInterface, QueryRunner } from "typeorm";

class SetUp1621728656484 implements MigrationInterface {
  name = "setUp1621728656484";

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `
    );
    await queryRunner.query(
      `CREATE TABLE "articles" ("id" SERIAL NOT NULL, "owner_id" character varying NOT NULL, "address" character varying NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "content_location" character varying NOT NULL, "targets" text NOT NULL, "problems" text NOT NULL, "detail" character varying, "resolved" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_metrics" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "article_count" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5496a36f94befd2cbf3a5eb4560" UNIQUE ("user_id"), CONSTRAINT "PK_987f8bd3fd2015b1c617b06b1cd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a9e4b690ab0b3d9e914878f6bf" ON "user_metrics" ("user_id", "article_count") `
    );
    await queryRunner.query(
      `CREATE TABLE "target_metrics" ("id" SERIAL NOT NULL, "target" character varying NOT NULL, "count" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_02843ca658f623fea41ccc24009" UNIQUE ("target"), CONSTRAINT "PK_8f21a6395726874be26a1f7f817" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0c2737b60cd72a6ee93024c4e1" ON "target_metrics" ("target", "count") `
    );
    await queryRunner.query(
      `CREATE TABLE "problem_metrics" ("id" SERIAL NOT NULL, "problem" character varying NOT NULL, "count" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7cc7f1abd99e0cca59c5f0f4bef" UNIQUE ("problem"), CONSTRAINT "PK_0dc6309090558a9024a11e5b502" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87e8e687c64c114a930de527f1" ON "problem_metrics" ("problem", "count") `
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_87e8e687c64c114a930de527f1"`);
    await queryRunner.query(`DROP TABLE "problem_metrics"`);
    await queryRunner.query(`DROP INDEX "IDX_0c2737b60cd72a6ee93024c4e1"`);
    await queryRunner.query(`DROP TABLE "target_metrics"`);
    await queryRunner.query(`DROP INDEX "IDX_a9e4b690ab0b3d9e914878f6bf"`);
    await queryRunner.query(`DROP TABLE "user_metrics"`);
    await queryRunner.query(`DROP TABLE "articles"`);
    await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}

export default SetUp1621728656484;
