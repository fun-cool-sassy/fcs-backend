import { MigrationInterface, QueryRunner } from "typeorm";

class ChangePrimaryType1621731229921 implements MigrationInterface {
  name = "changePrimaryType1621731229921";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "id" TYPE VARCHAR'
    );
    await queryRunner.query(
      'ALTER TABLE "articles" ALTER COLUMN "id" TYPE VARCHAR'
    );
    await queryRunner.query(
      'ALTER TABLE "user_metrics" ALTER COLUMN "id" TYPE VARCHAR'
    );
    await queryRunner.query(
      'ALTER TABLE "problem_metrics" ALTER COLUMN "id" TYPE VARCHAR'
    );
    await queryRunner.query(
      'ALTER TABLE "target_metrics" ALTER COLUMN "id" TYPE VARCHAR'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ALTER COLUMN "id" TYPE INTEGER'
    );
    await queryRunner.query(
      'ALTER TABLE "articles" ALTER COLUMN "id" TYPE INTEGER'
    );
    await queryRunner.query(
      'ALTER TABLE "user_metrics" ALTER COLUMN "id" TYPE INTEGER'
    );
    await queryRunner.query(
      'ALTER TABLE "problem_metrics" ALTER COLUMN "id" TYPE INTEGER'
    );
    await queryRunner.query(
      'ALTER TABLE "target_metrics" ALTER COLUMN "id" TYPE INTEGER'
    );
  }
}

export default ChangePrimaryType1621731229921;
