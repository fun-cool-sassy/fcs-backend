import supertest from "supertest";
import { camelCase } from "object-change-case";

import uniqid from "uniqid";
import createRequest from "../create-request";
import {SignInRequest, SignUpRequest} from "../../lib/schema";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /token", () => {
  test("success", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      password: uniqid(),
    };
    const signInRequest: SignInRequest = {
      username: signUpRequest.username,
      password: signUpRequest.password,
    };

    await request.post("/users").send(signUpRequest).expect(201);

    const tokenResult = await request.post("/token").send(signInRequest).expect(201);
    const token = camelCase(tokenResult.body) as Record<string, unknown>;
    expect(token.accessToken).not.toBeUndefined();
    expect(token.type).toEqual("bearer");
  });

  test("fail: password is not collect", async () => {
    const signUpRequest: SignUpRequest = {
      username: uniqid(),
      password: uniqid(),
    };
    const signInRequest: SignInRequest = {
      username: signUpRequest.username,
      password: uniqid(),
    };

    await request.post("/users").send(signUpRequest).expect(201);
    await request.post("/token").send(signInRequest).expect(403);
  });
});
