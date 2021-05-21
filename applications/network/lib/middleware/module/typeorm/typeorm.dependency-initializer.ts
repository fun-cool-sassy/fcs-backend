import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import {inContainerScope, inSingletonScope, interfaces} from "cheeket";
import { Connection, ConnectionOptions } from "typeorm";
import State from "../../../state";
import connectionProvider from "./connection.provider";
import TypeormToken from "./typeorm.token";

export type TypeormConfiguration = ConnectionOptions;

class TypeormDependencyInitializer implements DependencyInitializer {
  private readonly connectionProvider: interfaces.Provider<Connection>;

  constructor(config: TypeormConfiguration) {
    this.connectionProvider = inSingletonScope(connectionProvider(config));
  }

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(TypeormToken.Connection)) {
      context.containers.root.bind(
        TypeormToken.Connection,
        this.connectionProvider
      );
    }
  }
}

export default TypeormDependencyInitializer;
