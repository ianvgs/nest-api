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

    async recuperarHomeInformacoes(): Promise<any[]> {
        const ultimasNoticias = this.noticiaRepo.find({
            relations: { categoria: true },
            order: {
                createdAt: "DESC",
            },
            take: 7
        })
        const noticiasMaisLidas = this.noticiaRepo.find({
            relations: {
                tags: true
            },
            order: {
                views: "DESC",
            },
            take: 4
        })

        const [ultimasQuery, maisLidasQuery] = await Promise.all([ultimasNoticias, noticiasMaisLidas]);
        const principal = ultimasQuery.reduce(function (prev, current) {
            return (prev.views > current.views) ? prev : current
        })
        const ultimasFilter = ultimasQuery.filter(el => el.id !== principal.id);
        const homeNoticias = [{ ultimasNoticias: ultimasFilter }, { noticiasMaisLidas: maisLidasQuery }, { noticiaPrincipal: principal }];
        return homeNoticias;
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
