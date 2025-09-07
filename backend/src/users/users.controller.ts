import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './users.service';

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
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Başarılı olursa 204 döner
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
