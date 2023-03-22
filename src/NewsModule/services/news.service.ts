import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Noticia } from '../entities/noticia.entity';
import { Categoria } from '../entities/categoria.entity';
import { Tag } from '../entities/tag.entity';
import { Colaborador } from '../entities/colaborador.entity';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(Noticia, 'news_connection')
        private readonly noticiaRepo: Repository<Noticia>,
        @InjectRepository(Categoria, 'news_connection')
        private readonly categRepo: Repository<Categoria>,
        @InjectRepository(Tag, 'news_connection')
        private readonly tagRepo: Repository<Tag>,
        @InjectRepository(Colaborador, 'news_connection')
        private readonly colabRepo: Repository<Colaborador>,
    ) { }

    async recuperarHomeInformações(): Promise<any> {
        const noticias = await this.noticiaRepo.find();
        return noticias
    }

    async recuperarNoticiaFormData(): Promise<any> {
        const categorias = this.categRepo
            .createQueryBuilder('categoria')
            .select(['id AS value', 'nome AS label'])
            .getRawMany();
        const tags = await this.tagRepo
            .createQueryBuilder('tag')
            .select(['id AS value', 'tag AS label', 'color'])
            .getRawMany();

        const colabs = await this.colabRepo
            .createQueryBuilder('colaborador')
            .select(['id AS value', 'nome AS label'])
            .getRawMany();
        const [eventosQuery, tagsQuery, colabsQuery] = await Promise.all([categorias, tags, colabs]);
        const cadastrarNoticiasCofigs = [{ categorias: eventosQuery, tags: tagsQuery, colaboradores: colabsQuery }];
        return cadastrarNoticiasCofigs;
    }
}
