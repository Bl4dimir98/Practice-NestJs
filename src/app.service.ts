import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!, Code by: Bladimir Chicaiza <3, ';
  }
}
