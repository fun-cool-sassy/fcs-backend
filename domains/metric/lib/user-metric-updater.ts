import { UserMetricRepository } from "@fcs/repository";
import { UserMetric } from "@fcs/entity";

class UserMetricUpdater {
  constructor(private readonly userMetricRepository: UserMetricRepository) {}

  async update(userId: string, diff: number): Promise<UserMetric> {
    let userMetric = await this.userMetricRepository.findOneByUserId(userId);
    if (userMetric == null) {
      userMetric = new UserMetric();
      userMetric.userId = userId;
      userMetric.articleCount = 0;
    }

    userMetric.articleCount += diff;

    return this.userMetricRepository.save(userMetric);
  }
}

export default UserMetricUpdater;
