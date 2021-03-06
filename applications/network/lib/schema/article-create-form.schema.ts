import Joi from "joi";
import { ArticleCreateForm } from "@fcs/article";

const articleCreateFormSchema = Joi.object<Omit<ArticleCreateForm, "owner">>({
  address: Joi.string().required(),
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  contentLocation: Joi.string().uri().required(),
  targets: Joi.array().has(Joi.string()).required(),
  problems: Joi.array().has(Joi.string()).required(),
  detail: Joi.string().optional(),
});

export default articleCreateFormSchema;
