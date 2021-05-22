import { interfaces } from "cheeket";
import {
  ArticleRepository,
  ProblemMetricRepository,
  ProblemRankRepository,
  TargetMetricRepository,
  TargetRankRepository,
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
  ProblemMetricRepository: Symbol(
    "Repository@ProblemMetricRepository"
  ) as interfaces.Token<ProblemMetricRepository>,
  ProblemRankRepository: Symbol(
    "Repository@ProblemRankRepository"
  ) as interfaces.Token<ProblemRankRepository>,
  TargetMetricRepository: Symbol(
    "Repository@TargetMetricRepository"
  ) as interfaces.Token<TargetMetricRepository>,
  TargetRankRepository: Symbol(
    "Repository@TargetRankRepository"
  ) as interfaces.Token<TargetRankRepository>,
});

export default RepositoryToken;
