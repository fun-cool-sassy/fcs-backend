import supertest from "supertest";
import { camelCase } from "object-change-case";
import { UserRank } from "@fcs/entity";

import createRequest from "../create-request";
import createAuthorization from "../create-authorization";
import createArticle from "../create-article";
import createUser from "../create-user";
import getUser from "../get-user";

let request: supertest.SuperTest<supertest.Test>;
let authorization: string;

beforeAll(async () => {
  request = await createRequest();
  authorization = await createAuthorization(request);
});

describe("GET /user-ranks/:id", () => {
  test("success", async () => {
    const user = await getUser(request, authorization);

    const result = await request
      .get(`/user-ranks/${user.id}`)
      .set("Authorization", authorization)
      .expect(200);

    const ranks = camelCase(result.body) as UserRank;

    expect(ranks).not.toBeUndefined();
  });
});

describe("GET /user-ranks", () => {
  test("success", async () => {
    await createUser(request);
    await createUser(request);
    await createArticle(request, authorization);

    const result = await request
      .get(`/user-ranks`)
      .set("Authorization", authorization)
      .expect(200);

    const ranks = camelCase(result.body) as UserRank[];

    expect(ranks).not.toBeUndefined();
  });
});
