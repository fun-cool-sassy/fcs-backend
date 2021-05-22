import { interfaces } from "cheeket";
import { Authenticator, PasswordEncoder, UserFactory } from "@fcs/auth";

const AuthToken = Object.freeze({
  Authenticator: Symbol(
    "Auth@Authenticator"
  ) as interfaces.Token<Authenticator>,
  PasswordEncoder: Symbol(
    "Auth@PasswordEncoder"
  ) as interfaces.Token<PasswordEncoder>,
  UserFactory: Symbol("Auth@UserFactory") as interfaces.Token<UserFactory>,
});

export default AuthToken;
