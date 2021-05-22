import {ContainerContext, DependencyInitializer} from "@cheeket/koa";
import {ParameterizedContext} from "koa";
import {override} from "@course-design/decorators";
import {inContainerScope} from "cheeket";
import articleFactoryProvider from "./article-factory.provider";
import ArticleToken from "./article.token";
import State from "../../../state";
import {RepositoryToken} from "../repository";

class ArticleDependencyInitializer implements DependencyInitializer {
  private readonly articleFactoryProvider = inContainerScope(
    articleFactoryProvider(RepositoryToken.ArticleRepository)
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.context.isBound(ArticleToken.ArticleFactory)) {
      context.containers.context.bind(
        ArticleToken.ArticleFactory,
        this.articleFactoryProvider
      );
    }
  }
}

export default ArticleDependencyInitializer;
