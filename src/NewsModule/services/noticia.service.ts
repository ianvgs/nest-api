import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia, 'news_connection')
    private readonly noticiaRepo: Repository<Noticia>,

  ) { }
  async recuperarTodasNoticias(): Promise<Noticia[]> {
    const noticias = await this.noticiaRepo.find({
      relations: { colaborador: true, tags: true }
    });
    return noticias;
  }

  async cadastrarNoticia(props: Partial<Noticia>): Promise<Noticia> {

    const { titulo, resumo, texto, idCategoria, idColaborador, tags, idSite } = props;
    const createdNoticia = this.noticiaRepo.create({
      idSite,
      titulo,
      resumo,
      texto,
      idCategoria,
      idColaborador,
      ativo: "S",
      createdAt: new Date(),
      updatedAt: new Date(),
      tags
    });
    const savedNoticia = await this.noticiaRepo.save(createdNoticia);
    return savedNoticia;
  }

  async recuperarNoticiaPorId(id: number, idSite: number) {
    //Recupera a noticia
    const noticia = await this.noticiaRepo.findOne({
      where: {
        id: id
      },
      relations: {
        categoria: true,
        colaborador: true
      }
    });


    if (noticia.idSite != idSite) {
      throw new BadRequestException('Noticia de outro site');
    }


    //Incrementa o numero de views
    noticia.views = noticia.views + 1
    await this.noticiaRepo.save(noticia)

    return noticia;

  }
}
