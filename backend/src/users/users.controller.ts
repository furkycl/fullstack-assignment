import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // Bu controller'ın /users yolunu dinleyeceğini belirtir
export class UsersController {
  // NestJS, UsersService'i otomatik olarak bu controller'a "enjekte eder"
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET isteği /users yoluna geldiğinde bu metod çalışır
  findAll() {
    return this.usersService.findAll();
  }
}
