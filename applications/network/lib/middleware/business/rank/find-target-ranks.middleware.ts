import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";
import { normalizeQuery } from "../../../util";

function findTargetRanks(): Application.Middleware<State, Context> {
  return async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    context.state.user;

    const targetRankRepository = await context.resolve(
      RepositoryToken.TargetRankRepository
    );
    const { start, size } = context.query;
    const finalStart = normalizeQuery(start, Number) ?? 1;
    const finalSize = normalizeQuery(size, Number) ?? 10;

    context.body = await targetRankRepository.find(finalStart, finalSize);
    context.status = 200;

    await next();
  };
}

export default findTargetRanks;
