import Router from "koa-router";
import verify from "koa-verify";
import { bySchema } from "koa-verify-joi";
import { params, request } from "koa-position";

import { camelCase } from "koa-change-case";
import Context from "../context";
import { signUpRequestSchema } from "../schema";
import { createUser, findUser } from "../middleware";

function userRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/users");

  router.post(
    "/",
    verify(request("body"), bySchema(signUpRequestSchema)),
    createUser()
  );
  router.get("/:id", camelCase(params()), findUser());

  return router;
}

export default userRoutes;
