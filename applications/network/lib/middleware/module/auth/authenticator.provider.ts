import { interfaces } from "cheeket";
import {
  AuthenticateConfiguration,
  Authenticator,
  PasswordEncoder,
} from "@fcs/auth";
import { UserRepository } from "@fcs/repository";

function authenticatorProvider(
  config: AuthenticateConfiguration,
  userRepositoryToken: interfaces.Token<UserRepository>,
  passwordEncoderToken: interfaces.Token<PasswordEncoder>
): interfaces.Provider<Authenticator> {
  return async (context) => {
    const userRepository = await context.resolve(userRepositoryToken);
    const passwordEncoder = await context.resolve(passwordEncoderToken);

    return new Authenticator(config, userRepository, passwordEncoder);
  };
}

export default authenticatorProvider;
