import supertest from "supertest";
import { PlainUser } from "@fcs/entity";
import { camelCase } from "object-change-case";

async function getUser(
  request: supertest.SuperTest<supertest.Test>,
  authorization: string
): Promise<PlainUser> {
  const result = await request
    .get("/users/self")
    .set("Authorization", authorization)
    .expect(200);

  return camelCase(result.body) as PlainUser;
}

export default getUser;
