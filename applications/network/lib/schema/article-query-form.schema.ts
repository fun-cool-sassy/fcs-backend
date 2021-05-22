import Joi from "joi";

const articleQueryFormSchema = Joi.object({
  perPage: Joi.number().optional(),
  page: Joi.number().optional(),
  latitude: Joi.number(),
  longitude: Joi.number(),
  far: Joi.number().optional(),
})
  .with("latitude", "longitude")
  .with("longitude", "latitude");

export default articleQueryFormSchema;
