import { JsonObject } from "@course-design/types";
import Location from "./location";

interface PlainArticle extends JsonObject, Location {
  id?: string;

  ownerId: string;

  address: string;

  latitude: number;
  longitude: number;

  contentLocation: string;

  targets: string[];

  problems: string[];

  detail?: string;

  resolved: boolean;

  createdAt?: number;

  updatedAt?: number;
}

export default PlainArticle;
