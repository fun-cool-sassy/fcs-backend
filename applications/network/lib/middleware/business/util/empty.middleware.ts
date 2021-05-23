import Application from "koa";
import Context from "../../../context";
import State from "../../../state";

function empty(): Application.Middleware<State, Context> {
  return async (context, next) => {
    context.state = 200;
    await next();
  };
}

export default empty;
