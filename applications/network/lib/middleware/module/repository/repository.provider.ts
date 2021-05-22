import { EntityManager } from "typeorm";
import { interfaces } from "cheeket";
import { Repository } from "@fcs/repository";
import { Entity } from "@fcs/entity";

function repositoryProvider<T extends Repository<Entity>>(
  entityManagerToken: interfaces.Token<EntityManager>,
  Constructor: { new (entityManager: EntityManager): T }
): interfaces.Provider<T> {
  return async (context) => {
    const entityManager = await context.resolve(entityManagerToken);
    return new Constructor(entityManager);
  };
}

export default repositoryProvider;
