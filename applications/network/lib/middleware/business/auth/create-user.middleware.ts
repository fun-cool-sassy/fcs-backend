import Application from "koa";
import { SignUpRequest } from "@fcs/auth";

import Context from "../../../context";
import State from "../../../state";
import { AuthToken } from "../../module";

function createUser(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const userFactory = await context.resolve(AuthToken.UserFactory);
    const request: SignUpRequest = context.request.body;

    context.body = await userFactory.create(request);
    context.status = 201;

    await next();
  };
}

export default createUser;
