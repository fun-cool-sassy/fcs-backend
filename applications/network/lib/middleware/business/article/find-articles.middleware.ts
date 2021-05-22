import Application from "koa";
import { Article, Location } from "@fcs/entity";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";

function normalize<T>(
  arr: string | string[] | undefined,
  convert: (string: string) => T
): T | undefined {
  if (arr == null) {
    return undefined;
  }
  if (arr instanceof Array) {
    return convert(arr[0]);
  }
  return convert(arr);
}

function findArticles(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const articleRepository = await context.resolve(
      RepositoryToken.ArticleRepository
    );

    const { perPage, page, latitude, longitude, far } = context.query;

    const finalPerPage = normalize(perPage, Number) ?? 15;
    const finalPage = normalize(page, Number) ?? 0;
    const finalFar = normalize(far, Number) ?? 0.001;

    const skip = (finalPage - 1) * finalPerPage;
    const take = finalPerPage;

    let location: Location | undefined;
    if (latitude != null && longitude != null) {
      location = {
        latitude: normalize(latitude, Number) as number,
        longitude: normalize(longitude, Number) as number,
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