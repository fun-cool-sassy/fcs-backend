import cleanDeep from "clean-deep";
import { ApplicationConfiguration } from "./bootstrap";

import envConfig from "./env-config";

class ConfigurationProvider {
  private readonly config: ApplicationConfiguration;

  constructor(
    config: Partial<Omit<ApplicationConfiguration, "database">> &
      Partial<{
        database: Partial<ApplicationConfiguration["database"]>;
      }>
  ) {
    const cleanedConfig = cleanDeep(config);

    this.config = {
      port: config.port ?? envConfig.port,
      container: config.container ?? envConfig.container,
      database:
        config.database != null
          ? ({
              ...cleanedConfig.database,
              ...envConfig.database,
            } as ApplicationConfiguration["database"])
          : envConfig.database,
    };
  }

  get(): ApplicationConfiguration {
    return this.config;
  }
}

export default ConfigurationProvider;
