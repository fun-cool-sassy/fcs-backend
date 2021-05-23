import Application from "koa";

import Context from "../../../context";
import State from "../../../state";
import { RepositoryToken } from "../../module";

function findUser(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const { user } = context.state;
    const { id } = context.params;

    if (id === "self") {
      context.body = user;
    } else {
      const userRepository = await context.resolve(
        RepositoryToken.UserRepository
      );

      context.body = await userRepository.findOneOrFail(id);
    }

    context.status = 200;

    await next();
  };
}

export default findUser;
