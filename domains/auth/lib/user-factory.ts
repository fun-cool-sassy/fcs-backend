import { UserRepository } from "@fcs/repository";
import { User } from "@fcs/entity";
import PasswordEncoder from "./password-encoder";

class UserFactory {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder
  ) {}

  async create(request: { username: string; password: string }): Promise<User> {
    const { username, password } = request;
    const encodedPassword = this.passwordEncoder.encode(password);
    const user = User.from({ username, password: encodedPassword });

    return this.userRepository.create(user);
  }
}

export default UserFactory;
