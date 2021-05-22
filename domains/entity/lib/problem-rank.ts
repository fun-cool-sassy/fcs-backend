import Rank from "./rank";

interface ProblemRank extends Rank {
  id: string;

  problem: string;

  rank: number;

  count: number;
}

export default ProblemRank;
