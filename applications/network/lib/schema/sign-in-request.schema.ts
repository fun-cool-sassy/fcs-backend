import Joi from "joi";
import SignInRequest from "./sign-in-request";

const signInRequestSchema = Joi.object<SignInRequest>({
  username: Joi.string().min(4).max(30).required(),
  password: Joi.string().min(4).max(100).required(),
});

export default signInRequestSchema;
