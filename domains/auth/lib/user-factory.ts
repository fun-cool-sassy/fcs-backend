import { UserRepository } from "@fcs/repository";
import { User } from "@fcs/entity";
import PasswordEncoder from "./password-encoder";
import SignUpRequest from "./sign-up-request";

class UserFactory {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder
  ) {}

  async create(request: SignUpRequest): Promise<User> {
    const { username, password } = request;
    const encodedPassword = this.passwordEncoder.encode(password);

    const user = new User();
    user.username = username;
    user.password = encodedPassword;

    return this.userRepository.save(user);
  }
}

export default UserFactory;
