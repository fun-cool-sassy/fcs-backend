import { interfaces } from "cheeket";
import { Connection, EntityManager } from "typeorm";

const TypeormToken = Object.freeze({
  Connection: Symbol("Typeorm@Connection") as interfaces.Token<Connection>,
  EntityManager: Symbol(
    "Typeorm@EntityManager"
  ) as interfaces.Token<EntityManager>,
});

export default TypeormToken;
