import { MigrationInterface, QueryRunner } from "typeorm";

class ChangeArticleLocationType1621731229920 implements MigrationInterface {
  name = "changeArticleLocationType1621731229920";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "latitude" double precision NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "longitude" double precision NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "longitude"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "longitude" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "latitude"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "latitude" integer NOT NULL`
    );
  }
}

export default ChangeArticleLocationType1621731229920;
