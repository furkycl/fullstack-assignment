import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './users.service';

@Controller('users') // Bu controller'ın /users yolunu dinleyeceğini belirtir
export class UsersController {
  // NestJS, UsersService'i otomatik olarak bu controller'a "enjekte eder"
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET isteği /users yoluna geldiğinde bu metod çalışır
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':id') // /users/1, /users/2 gibi istekleri yakalar
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe: URL'den gelen 'id' parametresinin string'den number'a güvenli bir şekilde dönüştürülmesini sağlar.
    return this.usersService.findOne(id);
  }
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
