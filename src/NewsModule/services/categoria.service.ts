import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria, 'news_connection')
    private readonly categoriaRepo: Repository<Categoria>,
  ) { }

  async getTodasCategorias(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepo.find({
      /* relations: { noticias: true } */
    });
    return categorias;
  }
}
