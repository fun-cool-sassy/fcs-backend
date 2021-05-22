import { UserRepository } from "@fcs/repository";
import { User } from "@fcs/entity";
import { UserMetricUpdater } from "@fcs/metric";
import PasswordEncoder from "./password-encoder";
import SignUpRequest from "./sign-up-request";

class UserFactory {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder,
    private readonly userMetricUpdater: UserMetricUpdater
  ) {}

  async create(request: SignUpRequest): Promise<User> {
    const { username, email, password } = request;
    const encodedPassword = this.passwordEncoder.encode(password);

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = encodedPassword;

    const saved = await this.userRepository.save(user);
    await this.userMetricUpdater.update(saved.id!, 0);

    return saved;
  }
}

export default UserFactory;
