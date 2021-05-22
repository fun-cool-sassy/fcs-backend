import { interfaces } from "cheeket";
import {
  ProblemMetricUpdater,
  TargetMetricUpdater,
  UserMetricUpdater,
} from "@fcs/metric";

const MetricToken = Object.freeze({
  UserMetricUpdater: Symbol(
    "Metric@UserMetricUpdater"
  ) as interfaces.Token<UserMetricUpdater>,
  TargetMetricUpdater: Symbol(
    "Metric@TargetMetricUpdater"
  ) as interfaces.Token<TargetMetricUpdater>,
  ProblemMetricUpdater: Symbol(
    "Metric@ProblemMetricUpdater"
  ) as interfaces.Token<ProblemMetricUpdater>,
});

export default MetricToken;
