import supertest from "supertest";
import { camelCase } from "object-change-case";

import uniqid from "uniqid";
import { PlainUser } from "@fcs/entity";
import createRequest from "../create-request";
import { SignUpRequest } from "../../lib/schema";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /users", () => {
  test("success", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      password: uniqid(),
    };
    const result = await request.post("/users").send(signUpRequest).expect(201);

    const json = camelCase(result.body) as PlainUser;
    expect(json.id).not.toBeUndefined();
    expect(json.username).toEqual(signUpRequest.username);
    expect(json.createdAt).not.toBeUndefined();
    expect(json.updatedAt).not.toBeUndefined();
  });

  test("fail: duplicate user", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      password: uniqid(),
    };
    await request.post("/users").send(signUpRequest).expect(201);
    await request.post("/users").send(signUpRequest).expect(409);
  });
});
