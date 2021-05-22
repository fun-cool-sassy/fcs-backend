import Application from "koa";
import { use } from "@cheeket/koa";

import Context from "../../../context";
import State from "../../../state";
import MetricDependencyInitializer from "./metric.dependency-initializer";

function metric(): Application.Middleware<State, Context> {
  return use(new MetricDependencyInitializer(), async (context, next) => {
    await next();
  });
}

export default metric;
