import dotenv from "dotenv";
import { LoggerOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import cleanDeep from "clean-deep";
import { entities } from "@fcs/entity";
import path from "path";
import uniqid from "uniqid";

import { ApplicationConfiguration } from "./bootstrap";

dotenv.config();

const databaseConfig = {
  type: process.env.DATABASE_TYPE ?? "sqlite",

  host: process.env.DATABASE_HOST ?? "localhost",

  port: Number(process.env.DATABASE_PORT) ?? 5432,

  username: process.env.DATABASE_USERNAME,

  password: process.env.DATABASE_PASSWORD,

  database:
    process.env.DATABASE_DATABASE ?? path.join(__dirname, `../tmp/${uniqid()}`),

  dropSchema: Boolean(process.env.DATABASE_DROP_SCHEMA) ?? false,

  entities: [entities],

  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE) ?? false,

  logging: ([process.env.DATABASE_LOGGING] ?? "all") as LoggerOptions,

  namingStrategy: new SnakeNamingStrategy(),
};

const envConfig = {
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : undefined,
  database: databaseConfig as ApplicationConfiguration["database"],
  auth: {
    passwordSecret: process.env.AUTH_PASSWORD_SECRET,
    jwtSecret: process.env.AUTH_JWT_SECRET,
  },
};

export default cleanDeep(envConfig) as typeof envConfig;
