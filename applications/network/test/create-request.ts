import supertest from "supertest";

import bootstrap from "../lib/bootstrap";
import ConfigurationProvider from "../lib/configuration-provider";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const configProvider = new ConfigurationProvider({
    database: {
      synchronize: true,
      migrations: [],
    },
  });
  const config = configProvider.get();
  const server = await bootstrap(config);
  return supertest(server);
}

export default createRequest;
