import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { Colaborador } from '../entities/colaborador.entity';
import { DadosEconomicos } from '../entities/dados_economicos.entity';
import { Noticia } from '../entities/noticia.entity';
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
        @InjectRepository(Colaborador, 'news_connection')
        private readonly colabRepo: Repository<Colaborador>,
        @InjectRepository(DadosEconomicos, 'news_connection')
        private readonly dadosEconomicosRepo: Repository<DadosEconomicos>,
    ) { }



    async recuperarHomeInformacoes(layoutType, idSite): Promise<any[]> {

        //Layout Type= [0] => Nunca vem 0
        //Layout Type= [1] => Recupera 7 noticias, devolve 1 principal + 6 pro mural (Finanças, etc...)
        //Layout Type= [2] => Recupera 5 noticias, devolve 1 principal + 4 pro mural  (Baboseiras, etc...)
        const howMany = [0, 7, 5]

        const [ultimasQuery, maisLidasQuery] = await Promise.all([
            this.noticiaRepo.find({
                where: { idSite: idSite },
                relations: { categoria: true },
                order: {
                    createdAt: "DESC",
                },
                take: howMany[layoutType],
            }),
            this.noticiaRepo.find({
                where: { idSite: idSite },
                relations: {
                    tags: true
                },
                order: {
                    views: "DESC",
                },
                take: 4
            })]);

        let principal;
        if (ultimasQuery.length) {
            principal = ultimasQuery.reduce(function (prev, current) {
                return (prev.views > current.views) ? prev : current
            })
        }

        let ultimasFilter;
        if (ultimasQuery.length) {
            ultimasFilter = ultimasQuery.filter(el => el.id !== principal.id);
        }



        //Calculo de dados economicos.
        const dados = await this.dadosEconomicosRepo.find({
            order: {
                mes: "DESC",
            },
            take: 3
        })
        const ipcaFilter = dados.filter(el => el.indice === "IPCA")
        const inpcFilter = dados.filter(el => el.indice === "INPC")
        const igpmFilter = dados.filter(el => el.indice === "IGPM")

        const dadosEconomicosFormatados = { ipcaMes: ipcaFilter[0].mes, ipcaAcumulado12: ipcaFilter[0].valorAcumulado, ipcaValorMes: ipcaFilter[0].valor, inpcMes: inpcFilter[0].mes, inpcAcumulado12: inpcFilter[0].valorAcumulado, inpcValorMes: inpcFilter[0].valor, igpmMes: igpmFilter[0].mes, igpmAcumulado12: igpmFilter[0].mes, igpmValorMes: igpmFilter[0].valorAcumulado }



        //Modelagem do tipo objeto pra retorno front-end
        const homeNoticias = [{ ultimasNoticias: ultimasFilter }, { noticiasMaisLidas: maisLidasQuery }, { noticiaPrincipal: principal ?? null }, { dadosEconomicos: dadosEconomicosFormatados }];

        return homeNoticias;
    }

    async recuperarNoticiaFormData(idSite: number): Promise<any> {
        const categorias = this.categRepo
            .createQueryBuilder('categoria')
            .select(['id AS value', 'nome AS label'])
            .where("categoria.idSite = :idSite", { idSite })
            .getRawMany();
        const tags = await this.tagRepo
            .createQueryBuilder('tag')
            .select(['id AS value', 'tag AS label', 'color'])
            .where("tag.idSite = :idSite", { idSite })
            .getRawMany();

        const colabs = await this.colabRepo
            .createQueryBuilder('colaborador')
            .select(['id AS value', 'nome AS label'])
            .where("colaborador.idSite = :idSite", { idSite })
            .getRawMany();
        const [categsQuery, tagsQuery, colabsQuery] = await Promise.all([categorias, tags, colabs]);
        /*  console.log(categsQuery) */
        const cadastrarNoticiasCofigs = [{ categorias: categsQuery, tags: tagsQuery, colaboradores: colabsQuery }];
        return cadastrarNoticiasCofigs;
    }

    async recuperarDadosIndicesEconomicos(): Promise<any[]> {
        const dados = await this.dadosEconomicosRepo.find({
            order: {
                mes: "DESC",
            },
            take: 9

        })
        const ipcaFilter = dados.filter(el => el.indice === "IPCA")
        const inpcFilter = dados.filter(el => el.indice === "INPC")
        const igpmFilter = dados.filter(el => el.indice === "IGPM")

        const dadosEconomicos = [[...ipcaFilter], [...inpcFilter], [...igpmFilter]];

        return dadosEconomicos;
    }
}
