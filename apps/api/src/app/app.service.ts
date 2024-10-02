import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Contact sambhavjain2612@gmail.com' };
  }
}
