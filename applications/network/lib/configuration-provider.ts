import cleanDeep from "clean-deep";
import uniqid from "uniqid";
import path from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { entities } from "@fcs/entity";
import { migrations, migrationsDir } from "@fcs/migration";
import { ApplicationConfiguration } from "./bootstrap";

import envConfig from "./env-config";

class ConfigurationProvider {
  private readonly config: ApplicationConfiguration;

  constructor(
    config: Partial<Omit<ApplicationConfiguration, "database">> & {
      database: Partial<ApplicationConfiguration["database"]>;
    }
  ) {
    const cleanedConfig = cleanDeep(config);

    const defaultDatabaseConfig = {
      type: "sqlite",

      host: "localhost",

      port: 5432,

      database: path.join(__dirname, `../tmp/${uniqid()}.txt`),

      dropSchema: false,

      entities,

      migrations,

      migrationsDir,

      synchronize: false,

      logging: false,

      namingStrategy: new SnakeNamingStrategy(),
    };

    this.config = {
      port: envConfig.port ?? config.port,
      container: config.container,
      database: {
        ...defaultDatabaseConfig,
        ...cleanedConfig.database,
        ...envConfig.database,
      } as ApplicationConfiguration["database"],
      auth: {
        passwordSecret:
          envConfig.auth?.passwordSecret ??
          config.auth?.passwordSecret ??
          uniqid(),
        jwtSecret:
          envConfig.auth?.jwtSecret ?? config.auth?.jwtSecret ?? uniqid(),
      },
    };
  }

  get(): ApplicationConfiguration {
    return this.config;
  }
}

export default ConfigurationProvider;
