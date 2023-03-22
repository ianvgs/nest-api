import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia, 'news_database2')
    private readonly noticiaRepo: Repository<Noticia>,
  ) { }

  async recuperarTodasNoticias(): Promise<Noticia[]> {
    const noticias = await this.noticiaRepo.find();
    return noticias;
  }
  /*

  async getNoticiaEspecifica(idIdeia: number): Promise<Noticia> {
    const noticia = await this.noticiaRepo.findOne({
      where: { id: idIdeia },
      relations: {
        categoria: true,
        colaborador: true,
        tags: true,
      },
    });
    return noticia;
  } */

  async cadastrarNoticia(props) {
    const { titulo, resumo, observacao, idColaborador, idCategoria, tags } = props;

    const createdIdeia = this.noticiaRepo.create({ titulo, resumo, observacao, idColaborador, idCategoria, tags });
    console.log(createdIdeia);
    const savedNoticia = await this.noticiaRepo.save(createdIdeia);
    return createdIdeia
  }
}
