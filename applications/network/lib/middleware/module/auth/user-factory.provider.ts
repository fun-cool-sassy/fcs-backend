import { interfaces } from "cheeket";
import { PasswordEncoder, UserFactory } from "@fcs/auth";
import { UserRepository } from "@fcs/repository";
import { UserMetricUpdater } from "@fcs/metric";

function userFactoryProvider(
  userRepositoryToken: interfaces.Token<UserRepository>,
  passwordEncoderToken: interfaces.Token<PasswordEncoder>,
  userMetricUpdaterToken: interfaces.Token<UserMetricUpdater>
): interfaces.Provider<UserFactory> {
  return async (context) => {
    const userRepository = await context.resolve(userRepositoryToken);
    const passwordEncoder = await context.resolve(passwordEncoderToken);
    const userMetricUpdater = await context.resolve(userMetricUpdaterToken);

    return new UserFactory(userRepository, passwordEncoder, userMetricUpdater);
  };
}

export default userFactoryProvider;
