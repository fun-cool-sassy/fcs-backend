import supertest from "supertest";
import { PlainUser, User } from "@fcs/entity";
import { SignUpRequest } from "@fcs/auth";
import uniqid from "uniqid";
import { camelCase } from "object-change-case";

async function createUser(
  request: supertest.SuperTest<supertest.Test>
): Promise<User> {
  const signUpRequest: SignUpRequest = {
    username: uniqid(),
    email: `${uniqid()}@test.com`,
    password: uniqid(),
  };
  const result = await request.post("/users").send(signUpRequest).expect(201);
  const plainUser = camelCase(result.body) as PlainUser;

  const user = new User();
  user.id = plainUser.id;
  user.email = plainUser.email;
  user.username = plainUser.username;
  user.password = signUpRequest.password;
  user.createdAt =
    plainUser.createdAt != null ? new Date(plainUser.createdAt) : undefined;
  user.updatedAt =
    plainUser.updatedAt != null ? new Date(plainUser.updatedAt) : undefined;

  return user;
}

export default createUser;
