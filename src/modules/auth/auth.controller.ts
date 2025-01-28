import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDTO } from "./dto/signin.dto";
import { SignUpDTO } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  authenticate(@Body() data: SignInDTO) {
    return this.authService.signin(data);
  }

  @Post("signup")
  @HttpCode(HttpStatus.OK)
  async signup(@Body() data: SignUpDTO) {
    return this.authService.signup(data);
  }
}
