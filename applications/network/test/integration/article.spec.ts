import supertest from "supertest";
import { camelCase } from "object-change-case";
import uniqid from "uniqid";
import { Location, PlainArticle } from "@fcs/entity";
import { ArticleCreateForm } from "@fcs/article";

import createRequest from "../create-request";
import createAuthorization from "../create-authorization";
import createArticle from "../create-article";

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
      contentLocation: `https://${uniqid()}.com`,
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
    expect(article.contentLocation).toEqual(createForm.contentLocation);
    expect(article.targets).toEqual(createForm.targets);
    expect(article.problems).toEqual(createForm.problems);
    expect(article.detail).toBeNull();
    expect(article.resolved).toBeFalsy();
    expect(article.createdAt).not.toBeUndefined();
    expect(article.updatedAt).not.toBeUndefined();
  });
});

describe("GET /articles", () => {
  test("success: no location", async () => {
    await createArticle(request, authorization);

    const result = await request
      .get("/articles")
      .set("Authorization", authorization)
      .expect(200);

    const articles = camelCase(result.body) as PlainArticle[];
    expect(articles.length).not.toBeUndefined();
  });

  test("success: with location", async () => {
    await createArticle(request, authorization);

    const far = 1;
    const location: Location = {
      longitude: 0,
      latitude: 0,
    };
    const result = await request
      .get(
        `/articles?far=${far}&longitude=${location.longitude}&latitude=${location.latitude}`
      )
      .set("Authorization", authorization)
      .expect(200);

    const articles = camelCase(result.body) as PlainArticle[];
    expect(articles.length).not.toBeUndefined();
  });
});
