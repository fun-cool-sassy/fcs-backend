import dotenv from "dotenv";
import cleanDeep from "clean-deep";
import { entities } from "@fcs/entity";

import { ApplicationConfiguration } from "./bootstrap";

dotenv.config();

const databaseConfig = {
  type: process.env.DATABASE_TYPE,

  host: process.env.DATABASE_HOST,

  port:
    process.env.DATABASE_PORT != null
      ? Number(process.env.DATABASE_PORT)
      : undefined,

  username: process.env.DATABASE_USERNAME,

  password: process.env.DATABASE_PASSWORD,

  database: process.env.DATABASE_DATABASE,

  dropSchema:
    process.env.DATABASE_DROP_SCHEMA != null
      ? Number(process.env.DATABASE_PORT)
      : undefined,

  entities: [entities],

  synchronize:
    process.env.DATABASE_SYNCHRONIZE != null
      ? Number(process.env.DATABASE_SYNCHRONIZE)
      : undefined,

  logging:
    process.env.DATABASE_LOGGING != null
      ? [process.env.DATABASE_LOGGING]
      : undefined,
};

const envConfig = {
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : undefined,
  database: databaseConfig as Partial<ApplicationConfiguration["database"]>,
  auth: {
    passwordSecret: process.env.AUTH_PASSWORD_SECRET,
    jwtSecret: process.env.AUTH_JWT_SECRET,
  },
};

export default cleanDeep(envConfig) as typeof envConfig;
