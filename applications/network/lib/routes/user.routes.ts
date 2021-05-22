import Router from "koa-router";
import verify from "koa-verify";
import { bySchema } from "koa-verify-joi";
import { request } from "koa-position";

import Context from "../context";
import { signUpRequestSchema } from "../schema";
import { createUser } from "../middleware";

function userRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/users");

  router.post(
    "/",
    verify(request("body"), bySchema(signUpRequestSchema)),
    createUser()
  );

  return router;
}

export default userRoutes;
