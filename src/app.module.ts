import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
