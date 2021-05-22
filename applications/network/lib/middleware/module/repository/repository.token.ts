import { interfaces } from "cheeket";
import { ArticleRepository, UserRepository } from "@fcs/repository";

const RepositoryToken = Object.freeze({
  UserRepository: Symbol(
    "Repository@UserRepository"
  ) as interfaces.Token<UserRepository>,
  ArticleRepository: Symbol(
    "Repository@ArticleRepository"
  ) as interfaces.Token<ArticleRepository>,
});

export default RepositoryToken;
