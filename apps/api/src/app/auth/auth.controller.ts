import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto): Promise<string> {
    return await this.authService.login(body);
  }

  @Post('signup')
  async signup(@Body() body: SignupDto): Promise<string> {
    return await this.authService.signup(body);
  }
}
