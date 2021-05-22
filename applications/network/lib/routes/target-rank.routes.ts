import Router from "koa-router";
import Context from "../context";
import { findTargetRanks } from "../middleware";

function targetRankRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/target-ranks");

  router.get("/", findTargetRanks());

  return router;
}

export default targetRankRoutes;
