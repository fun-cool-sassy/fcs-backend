import Rank from "./rank";

interface TargetRank extends Rank {
  id: string;

  target: string;

  rank: number;

  count: number;
}

export default TargetRank;
