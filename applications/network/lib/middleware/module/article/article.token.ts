import { interfaces } from "cheeket";
import { ArticleFactory } from "@fcs/article";

const ArticleToken = Object.freeze({
  ArticleFactory: Symbol(
    "Article@ArticleFactory"
  ) as interfaces.Token<ArticleFactory>,
});

export default ArticleToken;
