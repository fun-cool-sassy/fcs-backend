import { MigrationInterface, QueryRunner } from "typeorm";

class UpdateArticle1621727338266 implements MigrationInterface {
  name = "updateArticle1621727338266";

  // eslint-disable-next-line class-methods-use-this
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "content_id"`);
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "content_location" character varying NOT NULL`
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "articles" DROP COLUMN "content_location"`
    );
    await queryRunner.query(
      `ALTER TABLE "articles" ADD "content_id" character varying NOT NULL`
    );
  }
}

export default UpdateArticle1621727338266;
