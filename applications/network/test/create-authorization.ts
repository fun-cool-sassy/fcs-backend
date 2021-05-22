import supertest from "supertest";
import {PlainUser, User} from "@fcs/entity";
import {SignInRequest, SignUpRequest} from "@fcs/auth";
import uniqid from "uniqid";
import {camelCase} from "object-change-case";
import createUser from "./create-user";

async function createAuthorization(
  request: supertest.SuperTest<supertest.Test>
): Promise<string> {
  const user = await createUser(request);
  const signInRequest: SignInRequest = {
    username: user.username,
    password: user.password,
  };

  const result = await request
    .post("/token")
    .send(signInRequest)
    .expect(201);
  
  const token = camelCase(result.body) as Record<string, unknown>;
 
  return `${token.type} ${token.accessToken}`
}

export default createAuthorization