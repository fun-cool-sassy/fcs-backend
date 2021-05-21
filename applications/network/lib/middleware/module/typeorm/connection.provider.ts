import { Connection, createConnection, ConnectionOptions } from "typeorm";
import { interfaces } from "cheeket";

function connectionProvider(
  options: ConnectionOptions
): interfaces.Provider<Connection> {
  return () => createConnection(options);
}

export default connectionProvider;
