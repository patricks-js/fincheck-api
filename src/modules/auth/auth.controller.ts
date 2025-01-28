import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticateDTO } from "./dto/authenticate.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  authenticate(@Body() data: AuthenticateDTO) {
    return this.authService.authenticate(data);
  }
}
