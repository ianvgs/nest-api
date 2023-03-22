import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';
import { Categoria } from '../entities/categoria.entity';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(Noticia, 'news_connection')
        private readonly noticiaRepo: Repository<Noticia>,
        @InjectRepository(Categoria, 'news_connection')
        private readonly categRepo: Repository<Categoria>,
        @InjectRepository(Tag, 'news_connection')
        private readonly tagRepo: Repository<Tag>,
    ) { }

    async recuperarHomeInformações(): Promise<any> {
        const noticias = await this.noticiaRepo.find();
        return noticias
    }

    async recuperarNoticiaFormData(): Promise<any> {
        const categorias = this.categRepo
            .createQueryBuilder('evento')
            .select(['id AS value', 'descricao AS label'])
            .getRawMany();
        const tags = await this.tagRepo
            .createQueryBuilder('tag')
            .select(['id AS value', 'tag AS label', 'color'])
            .getRawMany();
        const [eventosQuery, tagsQuery] = await Promise.all([categorias, tags]);
        const cadastrarNoticiasCofigs = [{ categorias: eventosQuery, tags: tagsQuery }];
        return cadastrarNoticiasCofigs;
    }
}
