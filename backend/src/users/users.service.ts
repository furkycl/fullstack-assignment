import { Injectable } from '@nestjs/common';

// Frontend'deki type'a benzer bir interface oluşturalım
export interface User {
  id: number;
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

  // Tüm kullanıcıları döndüren metod
  findAll(): User[] {
    return this.users;
  }
}
