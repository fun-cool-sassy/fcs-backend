import { Location } from "@fcs/entity";

interface ArticleCreateForm extends Location {
  address: string;

  latitude: number;
  longitude: number;

  contentId: string;

  targets: string[];

  problems: string[];

  detail?: string;
}

export default ArticleCreateForm;
