import { interfaces } from "cheeket";
import { PasswordEncoder } from "@fcs/auth";

function passwordEncoderProvider(
  secret: string
): interfaces.Provider<PasswordEncoder> {
  return () => new PasswordEncoder(secret);
}

export default passwordEncoderProvider;
