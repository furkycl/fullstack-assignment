import { Injectable, NotFoundException } from '@nestjs/common';

// Frontend'deki type'a benzer bir interface oluşturalım
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Yeni kullanıcı oluştururken frontend'den gelecek verinin tipini tanımlayalım (id'siz)
export interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  // Veritabanı yerine kullanacağımız hard-coded dizi
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
  ];
  private currentId = this.users.length;

  // Tüm kullanıcıları döndüren metod
  findAll(): User[] {
    return this.users;
  }

  // YENİ METOD
  findOne(id: number): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  // DTO gelen verinin şeklini(shape) (Data transfer Object deseni).
  create(userDto: CreateUserDto): User {
    const newUser = {
      id: ++this.currentId,
      ...userDto,
    };
    this.users.push(newUser);
    return newUser;
  }
}
