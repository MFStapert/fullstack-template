import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('hello')
  getHello(): string {
    return 'hello world';
  }

  @Get('healthcheck')
  healthcheck(): string {
    return 'OK';
  }
}
