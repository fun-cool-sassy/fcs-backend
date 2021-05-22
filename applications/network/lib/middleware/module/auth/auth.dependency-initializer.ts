import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope, inSingletonScope, interfaces } from "cheeket";
import { Authenticator, PasswordEncoder, UserFactory } from "@fcs/auth";

import State from "../../../state";
import AuthToken from "./auth.token";
import { RepositoryToken } from "../repository";
import authenticatorProvider from "./authenticator.provider";
import passwordEncoderProvider from "./password-encoder.provider";
import userFactoryProvider from "./user-factory.provider";
import { MetricToken } from "../metric";

export interface AuthConfiguration {
  passwordSecret: string;
  jwtSecret: string;
}

class AuthDependencyInitializer implements DependencyInitializer {
  private readonly passwordEncoderProvider: interfaces.Provider<PasswordEncoder>;

  private readonly userFactoryProvider: interfaces.Provider<UserFactory>;

  private readonly authenticatorProvider: interfaces.Provider<Authenticator>;

  constructor(config: AuthConfiguration) {
    this.passwordEncoderProvider = inSingletonScope(
      passwordEncoderProvider(config.passwordSecret)
    );
    this.userFactoryProvider = inContainerScope(
      userFactoryProvider(
        RepositoryToken.UserRepository,
        AuthToken.PasswordEncoder,
        MetricToken.UserMetricUpdater
      )
    );
    this.authenticatorProvider = inContainerScope(
      authenticatorProvider(
        { secret: config.jwtSecret },
        RepositoryToken.UserRepository,
        AuthToken.PasswordEncoder
      )
    );
  }

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(AuthToken.PasswordEncoder)) {
      context.containers.root.bind(
        AuthToken.PasswordEncoder,
        this.passwordEncoderProvider
      );
    }

    if (!context.containers.context.isBound(AuthToken.UserFactory)) {
      context.containers.context.bind(
        AuthToken.UserFactory,
        this.userFactoryProvider
      );
    }
    if (!context.containers.context.isBound(AuthToken.Authenticator)) {
      context.containers.context.bind(
        AuthToken.Authenticator,
        this.authenticatorProvider
      );
    }
  }
}

export default AuthDependencyInitializer;
