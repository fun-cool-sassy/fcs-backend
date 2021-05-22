import { interfaces } from "cheeket";
import {UserMetricUpdater} from "@fcs/metric";

const MetricToken = Object.freeze({
  UserMetricUpdater: Symbol(
    "Metric@UserMetricUpdater"
  ) as interfaces.Token<UserMetricUpdater>,
});

export default MetricToken;
