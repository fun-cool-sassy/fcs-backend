import Rank from "./rank";

interface UserRank extends Rank {
  id: string;

  userId: string;

  rank: number;

  articleCount: number;
}

export default UserRank;
