import cleanDeep from "clean-deep";
import uniqid from "uniqid";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { entities } from "@fcs/entity";
import path from "path";
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

      synchronize: false,

      logging: "all",

      namingStrategy: new SnakeNamingStrategy(),
    };

    this.config = {
      port: config.port ?? envConfig.port,
      container: config.container,
      database: {
        ...defaultDatabaseConfig,
        ...cleanedConfig.database,
        ...envConfig.database,
      } as ApplicationConfiguration["database"],
      auth: {
        passwordSecret:
          config.auth?.passwordSecret ??
          envConfig.auth?.passwordSecret ??
          uniqid(),
        jwtSecret:
          config.auth?.jwtSecret ?? envConfig.auth?.jwtSecret ?? uniqid(),
      },
    };
  }

  get(): ApplicationConfiguration {
    return this.config;
  }
}

export default ConfigurationProvider;
