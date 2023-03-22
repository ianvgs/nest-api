import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria, 'news_database2')
    private readonly categoriaRepo: Repository<Categoria>,
  ) { }

  async getTodosEventos(): Promise<Categoria[]> {
    const categorias = await this.categoriaRepo.find();
    return categorias;
  }

  async getIdeiasEventoEspecifico(idCategoria): Promise<Categoria> {
    const categoriasENoticias = await this.categoriaRepo.findOne({
      where: { id: idCategoria },
      relations: {
        noticias: { tags: true, colaborador: true },
      },
    });
    //Limit? Data?

    return categoriasENoticias;
  }
}
