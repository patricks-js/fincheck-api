import { UserRepository } from "@/database/repositories/user.repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcryptjs";
import { AuthenticateDTO } from "./dto/authenticate.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async authenticate({ email, password }: AuthenticateDTO) {
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if (!isPasswordCorrect)
      throw new UnauthorizedException("Invalid credentials");

    return {
      message: "Successfully authenticated",
    };
  }
}
