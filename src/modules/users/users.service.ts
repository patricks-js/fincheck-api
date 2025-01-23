import { UserRepository } from "@/database/repositories/user.repository";
import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ name, email, password }: CreateUserDTO) {
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
