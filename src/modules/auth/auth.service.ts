import { UserRepository } from "@/database/repositories/user.repository";
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { SignInDTO } from "./dto/signin.dto";
import { SignUpDTO } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin({ email, password }: SignInDTO) {
    const user = await this.userRepository.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isPasswordCorrect = await compare(password, user.passwordHash);

    if (!isPasswordCorrect)
      throw new UnauthorizedException("Invalid credentials");

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      accessToken,
    };
  }

  async signup({ name, email, password }: SignUpDTO) {
    const emailTaken = await this.userRepository.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) throw new ConflictException("Email already in use");

    const passwordHash = await hash(password, 10);

    return this.userRepository.create({
      data: {
        name,
        email,
        passwordHash,
        categories: {
          createMany: {
            data: [
              // Income
              { label: "Salário", type: "INCOME", icon: "dollar-sign" },
              // Expense
              { label: "Casa", type: "EXPENSE", icon: "home" },
              { label: "Alimentação", type: "EXPENSE", icon: "croissant" },
              { label: "Educação", type: "EXPENSE", icon: "graduation-cap" },
              { label: "Lazer", type: "EXPENSE", icon: "lightbulb" },
              { label: "Mercado", type: "EXPENSE", icon: "shopping-cart" },
              { label: "Transporte", type: "EXPENSE", icon: "bus" },
              { label: "Outros", type: "EXPENSE", icon: "circle-ellipsis" },
            ],
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
