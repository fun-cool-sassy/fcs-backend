import { Forbidden } from "http-errors";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { UserRepository } from "@fcs/repository";
import { User } from "@fcs/entity";

import PasswordEncoder from "./password-encoder";
import SignInRequest from "./sign-in-request";
import Token from "./token";

export interface AuthenticateConfiguration {
  secret: string;
}
class Authenticator {
  constructor(
    private readonly config: AuthenticateConfiguration,
    private readonly userRepository: UserRepository,
    private readonly passwordEncoder: PasswordEncoder
  ) {}

  async createAccessToken(request: SignInRequest): Promise<Token> {
    const { username, password } = request;

    const user = await this.userRepository.findOneByUsernameOfFail(username);
    const encodedPassword = this.passwordEncoder.encode(password);

    if (user.password !== encodedPassword) {
      throw new Forbidden("Password is not correct.");
    }

    const token = jwt.sign({ uid: user.id }, this.config.secret);
    return { value: token, type: "bearer" };
  }

  async authenticate(authorization: string): Promise<User> {
    const tokens = authorization.split(" ");
    if (tokens.length !== 2) {
      throw new Forbidden("Authorization is invalid.");
    }

    const type = tokens[0].toLowerCase();
    const credentials = tokens[1];

    if (type !== "bearer") {
      throw new Forbidden(`Unsupported authorization type ${type}.`);
    }

    const token = this.decodeCredentials(credentials);

    const userId = token.uid;
    if (userId == null) {
      throw new Forbidden(`Invalid token.`);
    }

    return this.userRepository.findOneOrFail(userId as string);
  }

  private decodeCredentials(credentials: string): Record<string, unknown> {
    try {
      return jwt.verify(credentials, this.config.secret) as Record<
        string,
        unknown
      >;
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new Forbidden(`Invalid token.`);
      }

      throw e;
    }
  }
}

export default Authenticator;
