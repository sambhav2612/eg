import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';

@Controller('account')
export class AccountController {
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
