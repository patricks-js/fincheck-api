import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateArgs) {
    return this.prisma.user.create(data);
  }

  async findUnique(findUniqueArgs: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique(findUniqueArgs);
  }
}
