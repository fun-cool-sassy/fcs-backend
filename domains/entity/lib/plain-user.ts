import { JsonObject } from "@course-design/types";

interface PlainUser extends JsonObject {
  id?: string;

  username: string;

  createdAt?: number;

  updatedAt?: number;
}

export default PlainUser;
