import { TargetMetricRepository } from "@fcs/repository";
import { TargetMetric } from "@fcs/entity";

class TargetMetricUpdater {
  constructor(
    private readonly targetMetricRepository: TargetMetricRepository
  ) {}

  async update(target: string, diff: number): Promise<TargetMetric> {
    let targetMetric = await this.targetMetricRepository.findOneByTarget(
      target
    );
    if (targetMetric == null) {
      targetMetric = new TargetMetric();
      targetMetric.target = target;
      targetMetric.count = 0;
    }

    targetMetric.count += diff;

    return this.targetMetricRepository.save(targetMetric);
  }
}

export default TargetMetricUpdater;
