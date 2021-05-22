import supertest from "supertest";
import { PlainArticle } from "@fcs/entity";
import uniqid from "uniqid";
import { camelCase } from "object-change-case";
import { ArticleCreateForm } from "@fcs/article";

async function createArticle(
  request: supertest.SuperTest<supertest.Test>,
  authorization: string
): Promise<PlainArticle> {
  const createForm: Omit<ArticleCreateForm, "owner"> = {
    address: uniqid(),
    latitude: 0,
    longitude: 0,
    contentId: uniqid(),
    targets: [uniqid()],
    problems: [uniqid()],
  };

  const result = await request
    .post("/articles")
    .send(createForm)
    .set("Authorization", authorization)
    .expect(201);

  return camelCase(result.body) as PlainArticle;
}

export default createArticle;
