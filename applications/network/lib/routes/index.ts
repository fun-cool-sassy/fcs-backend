import Router from "koa-router";
import Context from "../context";

import pigPongRoutes from "./ping-pong.routes";
import versionRoutes from "./version.routes";
import userRoutes from "./user.routes";
import tokenRoutes from "./token.routes";
import articleRoutes from "./article.routes";

function routes(): Router<never, Context> {
  const router = new Router<never, Context>();

  router.use(pigPongRoutes().routes());
  router.use(versionRoutes().routes());
  router.use(userRoutes().routes());
  router.use(tokenRoutes().routes());
  router.use(articleRoutes().routes());

  return router;
}

export default routes;
