import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";

function findUser(): Application.Middleware<State, Context> {
  return async (context, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    context.state.user;

    const { id } = context.params;

    const userRepository = await context.resolve(
      RepositoryToken.UserRepository
    );

    context.body = await userRepository.findOneOrFail(id);
    context.status = 200;

    await next();
  };
}

export default findUser;
