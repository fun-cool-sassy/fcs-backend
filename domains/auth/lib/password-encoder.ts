import crypto from "crypto";

class PasswordEncoder {
  private readonly algorithm = "sha256";

  constructor(private readonly secret: string) {}

  encode(password: string): string {
    return crypto
      .createHmac(this.algorithm, this.secret)
      .update(password)
      .digest("hex");
  }
}

export default PasswordEncoder;
