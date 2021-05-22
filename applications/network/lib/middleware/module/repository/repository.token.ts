import { interfaces } from "cheeket";
import { UserRepository } from "@fcs/repository";

const RepositoryToken = Object.freeze({
  UserRepository: Symbol(
    "Repository@UserRepository"
  ) as interfaces.Token<UserRepository>,
});

export default RepositoryToken;
