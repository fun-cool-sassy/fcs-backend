import Application from "koa";
import {use} from "@cheeket/koa";

import Context from "../../../context";
import State from "../../../state";
import ArticleDependencyInitializer from "./article.dependency-initializer";

function article(): Application.Middleware<State, Context> {
  return use(new ArticleDependencyInitializer(), async (context, next) => {
    await next();
  });
}

export default article;
