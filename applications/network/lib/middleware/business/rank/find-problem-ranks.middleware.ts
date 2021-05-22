import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";
import { normalizeQuery } from "../../../util";

function findProblemRanks(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const problemRankRepository = await context.resolve(
      RepositoryToken.ProblemRankRepository
    );
    const { start, size } = context.query;
    const finalStart = normalizeQuery(start, Number) ?? 1;
    const finalSize = normalizeQuery(size, Number) ?? 10;

    context.body = await problemRankRepository.find(finalStart, finalSize);
    context.status = 200;

    await next();
  };
}

export default findProblemRanks;
