import supertest from "supertest";
import { camelCase } from "object-change-case";
import uniqid from "uniqid";
import { PlainArticle } from "@fcs/entity";
import { ArticleCreateForm } from "@fcs/article";

import createRequest from "../create-request";
import createAuthorization from "../create-authorization";

let request: supertest.SuperTest<supertest.Test>;
let authorization: string;

beforeAll(async () => {
  request = await createRequest();
  authorization = await createAuthorization(request);
});

describe("POST /articles", () => {
  test("success", async () => {
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

    const article = camelCase(result.body) as PlainArticle;
    expect(article.id).not.toBeUndefined();
    expect(article.ownerId).not.toBeUndefined();
    expect(article.address).toEqual(createForm.address);
    expect(article.latitude).toEqual(createForm.latitude);
    expect(article.longitude).toEqual(createForm.longitude);
    expect(article.contentId).toEqual(createForm.contentId);
    expect(article.targets).toEqual(createForm.targets);
    expect(article.problems).toEqual(createForm.problems);
    expect(article.detail).toBeUndefined();
    expect(article.resolved).toBeFalsy();
    expect(article.createdAt).not.toBeUndefined();
    expect(article.updatedAt).not.toBeUndefined();
  });
});
