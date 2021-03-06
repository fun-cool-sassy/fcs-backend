import Application from "koa";
import { use } from "@cheeket/koa";
import { Unauthorized } from "http-errors";
import { User } from "@fcs/entity";

import Context from "../../../context";
import State from "../../../state";
import AuthDependencyInitializer, {
  AuthConfiguration,
} from "./auth.dependency-initializer";
import AuthToken from "./auth.token";

function auth(
  config: AuthConfiguration
): Application.Middleware<State, Context> {
  return use(new AuthDependencyInitializer(config), async (context, next) => {
    const { authorization } = context.headers;

    let user: User;
    if (authorization != null) {
      const authenticator = await context.resolve(AuthToken.Authenticator);
      user = await authenticator.authenticate(authorization);
    }

    Object.defineProperty(context.state, "user", {
      get(): User {
        if (user == null) {
          throw new Unauthorized("Authorization is required");
        }
        return user;
      },
    });

    await next();
  });
}

export default auth;
