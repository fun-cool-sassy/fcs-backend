import Router from "koa-router";
import Context from "../context";

import { empty } from "../middleware";
import pigPongRoutes from "./ping-pong.routes";
import versionRoutes from "./version.routes";
import userRoutes from "./user.routes";
import tokenRoutes from "./token.routes";
import articleRoutes from "./article.routes";
import userRankRoutes from "./user-rank.routes";
import targetRankRoutes from "./target-rank.routes";
import problemRankRoutes from "./problem-rank.routes";

function routes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.get("/", empty());

  router.use(pigPongRoutes().routes());
  router.use(versionRoutes().routes());

  router.use(userRoutes().routes());
  router.use(tokenRoutes().routes());
  router.use(articleRoutes().routes());
  router.use(userRankRoutes().routes());
  router.use(targetRankRoutes().routes());
  router.use(problemRankRoutes().routes());

  return router;
}

export default routes;
