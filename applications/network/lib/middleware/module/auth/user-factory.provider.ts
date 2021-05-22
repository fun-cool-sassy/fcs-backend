import { interfaces } from "cheeket";
import { PasswordEncoder, UserFactory } from "@fcs/auth";
import { UserRepository } from "@fcs/repository";

function userFactoryProvider(
  userRepositoryToken: interfaces.Token<UserRepository>,
  passwordEncoderToken: interfaces.Token<PasswordEncoder>
): interfaces.Provider<UserFactory> {
  return async (context) => {
    const userRepository = await context.resolve(userRepositoryToken);
    const passwordEncoder = await context.resolve(passwordEncoderToken);

    return new UserFactory(userRepository, passwordEncoder);
  };
}

export default userFactoryProvider;
