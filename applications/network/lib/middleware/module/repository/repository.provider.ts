import { EntityManager } from "typeorm";
import { interfaces } from "cheeket";

function repositoryProvider<T>(
  entityManagerToken: interfaces.Token<EntityManager>,
  Constructor: { new (entityManager: EntityManager): T }
): interfaces.Provider<T> {
  return async (context) => {
    const entityManager = await context.resolve(entityManagerToken);
    return new Constructor(entityManager);
  };
}

export default repositoryProvider;
