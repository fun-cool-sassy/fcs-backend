import Router from "koa-router";
import { params } from "koa-position";

import { camelCase } from "koa-change-case";
import Context from "../context";
import { findUserRank, findUserRanks } from "../middleware";

function userRankRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/user-ranks");

  router.get("/@:userId", camelCase(params()), findUserRank());
  router.get("/", findUserRanks());

  return router;
}

export default userRankRoutes;
