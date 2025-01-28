import { plainToInstance } from "class-transformer";
import { IsBase64, IsNotEmpty, IsString, validateSync } from "class-validator";

class Env {
  @IsString()
  @IsNotEmpty()
  @IsBase64()
  authSecret: string;
}

const _env: Env = plainToInstance(Env, {
  authSecret: process.env.AUTH_SECRET,
});

const errors = validateSync(_env);

if (errors.length > 0) {
  throw new Error(
    `Invalid environment variables ${JSON.stringify(errors, null, 2)}`,
  );
}

export const env = _env;
