import Application from "koa";
import { SignInRequest } from "@fcs/auth";

import Context from "../../../context";
import State from "../../../state";
import { AuthToken } from "../../module";

function createToken(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const authenticator = await context.resolve(AuthToken.Authenticator);
    const request: SignInRequest = context.request.body;

    const token = await authenticator.createAccessToken(request);

    context.body = {
      accessToken: token.value,
      type: token.type,
    };
    context.status = 201;

    await next();
  };
}

export default createToken;
