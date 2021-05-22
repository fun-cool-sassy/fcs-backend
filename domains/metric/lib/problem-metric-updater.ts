import { ProblemMetricRepository } from "@fcs/repository";
import { ProblemMetric } from "@fcs/entity";

class ProblemMetricUpdater {
  constructor(
    private readonly problemMetricRepository: ProblemMetricRepository
  ) {}

  async update(problem: string, diff: number): Promise<ProblemMetric> {
    let problemMetric = await this.problemMetricRepository.findOneByProblem(
      problem
    );
    if (problemMetric == null) {
      problemMetric = new ProblemMetric();
      problemMetric.problem = problem;
      problemMetric.count = 0;
    }

    problemMetric.count += diff;

    return this.problemMetricRepository.save(problemMetric);
  }
}

export default ProblemMetricUpdater;
