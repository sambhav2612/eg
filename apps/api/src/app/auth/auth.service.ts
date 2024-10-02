import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { SignupDto } from './dtos/signup.dto';
import { Account } from '../account/account.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async login(data: LoginDto): Promise<string> {
    const account = await this.accountService.findOneByEmail(data.email);
    if (!account) {
      throw new HttpException(
        'No account found with this email!',
        HttpStatus.BAD_REQUEST
      );
    }

    const isMatch = await bcrypt.compare(data.password, account.password);
    if (!isMatch) {
      throw new HttpException(
        'Password does not match!',
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.generateToken(account);
  }

  async signup(data: SignupDto): Promise<string> {
    const account = await this.accountService.findOneByEmail(data.email);
    if (account) {
      throw new HttpException(
        'Account already exists this email!',
        HttpStatus.BAD_REQUEST
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(data.password, salt);
    const payload = { ...data, password: hashedPwd };
    await this.accountService.createAccount(payload);

    return await this.generateToken(payload);
  }

  async generateToken(payload: Account): Promise<string> {
    delete payload.password;
    return `?token=${await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    })}`;
  }
}
