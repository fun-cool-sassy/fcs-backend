import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope } from "cheeket";

import State from "../../../state";
import articleFactoryProvider from "./article-factory.provider";
import ArticleToken from "./article.token";
import { MetricToken } from "../metric";
import { RepositoryToken } from "../repository";
import { SocketIoToken } from "../socket-io";

class ArticleDependencyInitializer implements DependencyInitializer {
  private readonly articleFactoryProvider = inContainerScope(
    articleFactoryProvider(
      RepositoryToken.ArticleRepository,
      MetricToken.UserMetricUpdater,
      SocketIoToken.Broadcaster
    )
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
