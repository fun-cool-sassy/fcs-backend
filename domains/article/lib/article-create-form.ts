import { Location, User } from "@fcs/entity";

interface ArticleCreateForm extends Location {
  owner: User;

  address: string;

  latitude: number;
  longitude: number;

  contentLocation: string;

  targets: string[];

  problems: string[];

  detail?: string;
}

export default ArticleCreateForm;
