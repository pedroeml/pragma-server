import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getAppReport(): string {
    return 'NestJS server is up and running!';
  }
}
