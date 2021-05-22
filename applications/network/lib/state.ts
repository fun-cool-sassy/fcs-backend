import { DefaultState } from "koa";
import { User } from "@fcs/entity";

interface State extends DefaultState {
  id: string;
  user: User;
}

export default State;
