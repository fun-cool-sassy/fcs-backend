import Application from "koa";
import { use } from "@cheeket/koa";

import Context from "../../../context";
import State from "../../../state";
import TypeormDependencyInitializer, {
  TypeormConfiguration,
} from "./typeorm.dependency-initializer";
import TypeormToken from "./typeorm.token";

function typeorm(
  config: TypeormConfiguration
): Application.Middleware<State, Context> {
  return use(
    new TypeormDependencyInitializer(config),
    async (context, next) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const connection = await context.resolve(TypeormToken.Connection);
      if (context.database == null) {
        context.database = {
          connection,
        };
      }
      if (context.database.connection == null) {
        context.database.connection = connection;
      }

      await connection.transaction(async (entityManager) => {
        context.containers.context.bind(
          TypeormToken.EntityManager,
          () => entityManager
        );
        await next();
      });
      context.containers.context.unbind(TypeormToken.EntityManager);
    }
  );
}

export default typeorm;
