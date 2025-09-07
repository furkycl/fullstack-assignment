import { Injectable, NotFoundException } from '@nestjs/common';

// Tip ve DTO (Data Transfer Object) tanımlamaları
export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostDto {
  userId: number;
  title: string;
  body: string;
}

export interface UpdatePostDto {
  userId?: number;
  title?: string;
  body?: string;
}

@Injectable()
export class PostsService {
  // Veritabanı yerine kullanacağımız sahte veri dizisi
  private posts: Post[] = [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit...',
    },
    {
      userId: 1,
      id: 2,
      title: 'qui est esse',
      body: 'est rerum tempore vitae...',
    },
    {
      userId: 2,
      id: 3,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure...',
    },
    {
      userId: 3,
      id: 4,
      title: 'eum et est occaecati',
      body: 'ullam et saepe reiciendis voluptatem adipisci...',
    },
  ];

  // Yeni ID'ler oluşturmak için basit bir sayaç
  private currentId = this.posts.length;

  // Tüm gönderileri döndürür
  findAll(): Post[] {
    return this.posts;
  }

  // ID'ye göre tek bir gönderi bulur, bulamazsa 404 hatası fırlatır
  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  // Yeni bir gönderi oluşturur
  create(postDto: CreatePostDto): Post {
    const newPost: Post = {
      id: ++this.currentId,
      ...postDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  // Mevcut bir gönderiyi günceller
  update(id: number, postDto: UpdatePostDto): Post {
    const post = this.findOne(id); // Önce gönderinin var olduğundan emin ol
    const postIndex = this.posts.findIndex((p) => p.id === id);

    const updatedPost = { ...post, ...postDto };
    this.posts[postIndex] = updatedPost;

    return updatedPost;
  }

  // Bir gönderiyi siler
  delete(id: number): void {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }
}
