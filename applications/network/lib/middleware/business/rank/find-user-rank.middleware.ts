import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";

function findUserRank(): Application.Middleware<State, Context> {
  return async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    context.state.user;

    const userRankRepository = await context.resolve(
      RepositoryToken.UserRankRepository
    );
    const { userId } = context.params;

    context.body = await userRankRepository.findOneByUserId(userId);
    context.status = 200;

    await next();
  };
}

export default findUserRank;
