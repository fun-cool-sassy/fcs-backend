import Router from "koa-router";
import verify from "koa-verify";
import { bySchema } from "koa-verify-joi";
import { request } from "koa-position";

import Context from "../context";
import { articleCreateFormSchema, articleQueryFormSchema } from "../schema";
import { createArticle, findArticles } from "../middleware";

function articleRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/articles");

  router.post(
    "/",
    verify(request("body"), bySchema(articleCreateFormSchema)),
    createArticle()
  );

  router.get(
    "/",
    verify(request("query"), bySchema(articleQueryFormSchema)),
    findArticles()
  );

  return router;
}

export default articleRoutes;
