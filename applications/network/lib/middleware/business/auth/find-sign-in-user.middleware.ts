import Application from "koa";

import Context from "../../../context";
import State from "../../../state";

function findSignInUser(): Application.Middleware<State, Context> {
  return async (context, next) => {
    context.body = context.state.user;
    context.status = 200;

    await next();
  };
}

export default findSignInUser;
