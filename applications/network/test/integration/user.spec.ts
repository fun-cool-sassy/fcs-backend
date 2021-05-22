import supertest from "supertest";
import { camelCase } from "object-change-case";
import uniqid from "uniqid";
import { PlainUser } from "@fcs/entity";
import { SignUpRequest } from "@fcs/auth";

import createRequest from "../create-request";
import createAuthorization from "../create-authorization";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /users", () => {
  test("success", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      email: `${uniqid()}@test.com`,
      password: uniqid(),
    };
    const result = await request.post("/users").send(signUpRequest).expect(201);

    const json = camelCase(result.body) as PlainUser;
    expect(json.id).not.toBeUndefined();
    expect(json.username).toEqual(signUpRequest.username);
    expect(json.email).toEqual(signUpRequest.email);
    expect(json.createdAt).not.toBeUndefined();
    expect(json.updatedAt).not.toBeUndefined();
  });

  test("fail: duplicate user", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      email: `${uniqid()}@test.com`,
      password: uniqid(),
    };
    await request.post("/users").send(signUpRequest).expect(201);
    await request.post("/users").send(signUpRequest).expect(409);
  });
});

describe("GET /users/self", () => {
  test("success", async () => {
    const authorization = await createAuthorization(request);

    const result = await request
      .get("/users/self")
      .set("Authorization", authorization)
      .expect(200);

    const json = camelCase(result.body) as PlainUser;
    expect(json.id).not.toBeUndefined();
    expect(json.username).not.toBeUndefined();
    expect(json.email).not.toBeUndefined();
    expect(json.createdAt).not.toBeUndefined();
    expect(json.updatedAt).not.toBeUndefined();
  });
});
