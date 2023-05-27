import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getNoticiasPorCategoria(nomeCategoria: string, idSite: number): Promise<Categoria> {
    const noticiasPorCategorias = await this.categoriaRepo.findOne({
      where: {
        sufixurl: nomeCategoria,
      },
      relations: {
        noticias: { colaborador: true, tags: true }
      }
    })

    if (noticiasPorCategorias.idSite != idSite) {
      throw new BadRequestException('Noticia de outro site');
    }



    return noticiasPorCategorias

  }
  async cadastrarCategoria(props: Partial<Categoria>): Promise<Categoria> {
    const { nome, sufixurl, descricao, idSite } = props;
    const createdCategoria = this.categoriaRepo.create({
      nome, sufixurl, descricao, idSite,

      createdAt: new Date(),

    });
    const savedCategoria = await this.categoriaRepo.save(createdCategoria);
    return savedCategoria;
  }

}
