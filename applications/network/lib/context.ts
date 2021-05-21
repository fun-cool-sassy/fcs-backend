import { ContainerContext } from "@cheeket/koa";
import { RouterContext } from "koa-router";
import { Logger } from "winston";
import { Connection } from "typeorm";

type Context = ContainerContext &
  RouterContext & { logger: Logger } & { database: { connection: Connection } };

export default Context;
