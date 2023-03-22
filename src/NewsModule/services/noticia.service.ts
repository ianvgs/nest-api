import { Injectable, NotFoundException } from '@nestjs/common';
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
      relations: { colaborador: true }
    });
    return noticias;
  }
}
