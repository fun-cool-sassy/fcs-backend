import { interfaces } from "cheeket";
import {
  ArticleRepository,
  UserMetricRepository,
  UserRankRepository,
  UserRepository,
} from "@fcs/repository";

const RepositoryToken = Object.freeze({
  UserRepository: Symbol(
    "Repository@UserRepository"
  ) as interfaces.Token<UserRepository>,
  ArticleRepository: Symbol(
    "Repository@ArticleRepository"
  ) as interfaces.Token<ArticleRepository>,
  UserMetricRepository: Symbol(
    "Repository@UserMetricRepository"
  ) as interfaces.Token<UserMetricRepository>,
  UserRankRepository: Symbol(
    "Repository@UserRankRepository"
  ) as interfaces.Token<UserRankRepository>,
});

export default RepositoryToken;
