import bootstrap from "./bootstrap";
import ConfigurationProvider from "./configuration-provider";

const configProvider = new ConfigurationProvider({
  port: 8080,
  database: {},
});
const config = configProvider.get();
bootstrap(config).then(() => console.log(config.port));
