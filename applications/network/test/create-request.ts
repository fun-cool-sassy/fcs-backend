import supertest from "supertest";
import * as path from "path";
import uniqid from "uniqid";

import bootstrap from "../lib/bootstrap";
import ConfigurationProvider from "../lib/configuration-provider";

async function createRequest(): Promise<supertest.SuperTest<supertest.Test>> {
  const configProvider = new ConfigurationProvider({
    database: { database: path.join(__dirname, `../tmp/${uniqid()}`) },
  });
  const server = await bootstrap(configProvider.get());
  return supertest(server);
}

export default createRequest;
