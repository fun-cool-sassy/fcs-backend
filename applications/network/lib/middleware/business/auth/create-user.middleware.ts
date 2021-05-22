import Application from "koa";
import Context from "../../../context";
import State from "../../../state";
import { AuthToken } from "../../module";
import { SignUpRequest } from "../../../schema";

function createUser(): Application.Middleware<State, Context> {
  return async (context, next) => {
    const userFactory = await context.resolve(AuthToken.UserFactory);
    const request: SignUpRequest = context.body;

    const user = await userFactory.create(request);

    context.body = user;

    await next();
  };
}

export default createUser;
