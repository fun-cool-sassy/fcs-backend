import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";
import { normalizeQuery } from "../../../util";

function findUserRanks(): Application.Middleware<State, Context> {
  return async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    context.state.user;

    const userRankRepository = await context.resolve(
      RepositoryToken.UserRankRepository
    );
    const { start, size } = context.query;
    const finalStart = normalizeQuery(start, Number) ?? 1;
    const finalSize = normalizeQuery(size, Number) ?? 10;

    context.body = await userRankRepository.find(finalStart, finalSize);
    context.status = 200;

    await next();
  };
}

export default findUserRanks;
