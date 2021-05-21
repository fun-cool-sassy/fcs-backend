import { interfaces } from "cheeket";
import { Connection } from "typeorm";

const TypeormToken = Object.freeze({
  Connection: Symbol("Typeorm@Connection") as interfaces.Token<Connection>,
});

export default TypeormToken;
