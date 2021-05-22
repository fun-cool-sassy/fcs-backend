import Router from "koa-router";
import Context from "../context";
import { findProblemRanks } from "../middleware";

function problemRankRoutes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.prefix("/problem-ranks");

  router.get("/", findProblemRanks());

  return router;
}

export default problemRankRoutes;
