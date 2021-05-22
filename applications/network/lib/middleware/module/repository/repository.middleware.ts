import Application from "koa";
import { use } from "@cheeket/koa";

import Context from "../../../context";
import State from "../../../state";
import RepositoryDependencyInitializer from "./repository.dependency-initializer";

function repository(): Application.Middleware<State, Context> {
  return use(new RepositoryDependencyInitializer(), async (context, next) => {
    await next();
  });
}

export default repository;
