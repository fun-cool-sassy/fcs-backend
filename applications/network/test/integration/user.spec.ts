import supertest from "supertest";
import { camelCase } from "object-change-case";

import createRequest from "../create-request";
import uniqid from "uniqid";
import {SignUpRequest} from "../../lib/schema";
import {PlainUser} from "@fcs/entity";

let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  request = await createRequest();
});

describe("POST /user", () => {
  test("success", async () => {
    const signUpRequest: SignUpRequest = { username: uniqid(), password: uniqid() };
    const result = await request
      .post("/user")
      .send(signUpRequest)
      .expect(201);

    const json = camelCase(result.body) as PlainUser;
    expect(json.id).not.toBeUndefined();
    expect(json.username).toEqual(signUpRequest.username);
    expect(json.createdAt).not.toBeUndefined();
    expect(json.updatedAt).not.toBeUndefined();
  });
});
