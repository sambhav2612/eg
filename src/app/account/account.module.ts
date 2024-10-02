import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './account.schema';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Account', schema: AccountSchema }]),
  ],
  providers: [AccountService, AuthGuard],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
