import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './account.interface';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/dtos/signup.dto';

@Injectable()
export class AccountService {
  private logger = new Logger(AccountService.name);

  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>
  ) {}

  async findOneByEmail(email: string): Promise<Account> {
    this.logger.log('findOneByEmail', email);
    return await this.accountModel.findOne({ email }).lean().exec();
  }

  async createAccount(payload: SignupDto): Promise<string> {
    this.logger.log('createAccount', payload.email);
    const account = new this.accountModel(payload);
    await account.save();
    return 'OK';
  }
}
