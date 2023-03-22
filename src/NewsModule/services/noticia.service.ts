import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';
import { NoticiaTag } from '../entities/noticiaTag.entity';

type TagsFromForm = {
  value: number;
  label: string;
  color: string;
}

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia, 'news_connection')
    private readonly noticiaRepo: Repository<Noticia>,
    @InjectRepository(Noticia, 'news_connection')
    private readonly noticiaTagRepo: Repository<NoticiaTag>,

  ) { }
  async recuperarTodasNoticias(): Promise<Noticia[]> {
    const noticias = await this.noticiaRepo.find({
      relations: { colaborador: true }
    });
    return noticias;
  }

  async cadastrarNoticia(props: Partial<Noticia>): Promise<Noticia> {
    const { titulo, resumo, observacao, idCategoria, idColaborador, tags } = props;
    const createdNoticia = this.noticiaRepo.create({
      titulo,
      resumo,
      observacao,
      idCategoria,
      idColaborador,
      ativo: "S",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedNoticia = await this.noticiaRepo.save(createdNoticia);


    Promise.all(
      tags.map(async (each: any) => {
        console.log(each)
        let createRelation = await this.noticiaTagRepo.create({
          idNoticia: savedNoticia.id,
          idTag: each.value,
          ativo: 'S',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        await this.noticiaTagRepo.save(createRelation);
      })
    )

    return savedNoticia;
  }
}
