import Application from "koa";
import { Location } from "@fcs/entity";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";
import { normalizeQuery } from "../../../util";

function findArticles(): Application.Middleware<State, Context> {
  return async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    context.state.user;

    const articleRepository = await context.resolve(
      RepositoryToken.ArticleRepository
    );

    const { perPage, page, latitude, longitude, far } = context.query;

    const finalPerPage = Math.max(normalizeQuery(perPage, Number) ?? 15, 1);
    const finalPage = Math.max(normalizeQuery(page, Number) ?? 1, 1);
    const finalFar = Math.max(normalizeQuery(far, Number) ?? 0.001, 0.001);

    const skip = (finalPage - 1) * finalPerPage;
    const take = finalPerPage;

    let location: Location | undefined;
    if (latitude != null && longitude != null) {
      location = {
        latitude: normalizeQuery(latitude, Number) as number,
        longitude: normalizeQuery(longitude, Number) as number,
      };
    }

    const [articles, count] = await articleRepository.findAndCountNear({
      skip,
      take,
      location,
      far: finalFar,
    });

    context.set("Total-Count", count.toString());
    context.set("Total-Page", Math.ceil(count / finalPage).toString());
    context.set("Page", finalPage.toString());

    context.body = articles;
    context.status = 200;

    await next();
  };
}

export default findArticles;
