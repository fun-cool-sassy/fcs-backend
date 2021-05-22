import { JsonObject } from "@course-design/types";

interface PlainArticle extends JsonObject {
  id?: string;

  address: string;

  latitude: number;
  longitude: number;

  targets: string[];

  problems: string[];

  detail: string;

  resolved: boolean;

  createdAt?: number;

  updatedAt?: number;
}

export default PlainArticle;
