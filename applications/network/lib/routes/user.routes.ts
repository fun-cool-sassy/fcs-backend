import Router from "koa-router";
import verify from "koa-verify";
import { bySchema } from "koa-verify-joi";
import { request } from "koa-position";

import Context from "../context";
import { signUpRequestSchema } from "../schema";
import { createUser } from "../middleware";
import findSignInUser from "../middleware/business/auth/find-sign-in-user.middleware";

function userRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/users");

  router.post(
    "/",
    verify(request("body"), bySchema(signUpRequestSchema)),
    createUser()
  );
  router.get("/self", findSignInUser());

  return router;
}

export default userRoutes;
