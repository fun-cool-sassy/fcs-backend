import Application from "koa";
import { ArticleCreateForm } from "@fcs/article";

import Context from "../../../context";
import State from "../../../state";
import { ArticleToken } from "../../module";

function createArticle(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const articleFactory = await context.resolve(ArticleToken.ArticleFactory);
    const request: ArticleCreateForm = context.request.body;

    context.body = await articleFactory.create(request);
    context.status = 201;

    await next();
  };
}

export default createArticle;
