import Joi from "joi";
import { SignUpRequest } from "@fcs/auth";

const signUpRequestSchema = Joi.object<SignUpRequest>({
  username: Joi.string().min(4).max(30).required(),
  password: Joi.string().min(4).max(100).required(),
});

export default signUpRequestSchema;
