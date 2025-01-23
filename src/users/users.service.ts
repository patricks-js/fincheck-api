import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  async create(data: CreateUserDTO) {
    return data;
  }
}
