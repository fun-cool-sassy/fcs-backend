import Router from "koa-router";
import verify from "koa-verify";
import { bySchema } from "koa-verify-joi";
import { request } from "koa-position";

import Context from "../context";
import {signInRequestSchema, signUpRequestSchema} from "../schema";
import {createToken, createUser} from "../middleware";

function tokenRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/token");

  router.post(
    "/",
    verify(request("body"), bySchema(signInRequestSchema)),
    createToken()
  );

  return router;
}

export default tokenRoutes;
