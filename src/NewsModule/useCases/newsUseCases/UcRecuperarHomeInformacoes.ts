/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Noticia } from 'src/NewsModule/entities/noticia.entity';
import { NewsService } from 'src/NewsModule/services/news.service';

@Injectable()
export class UcRecuperarHomeInformacoes {
    constructor(private readonly newsService: NewsService) { }

    async run(layoutType, idSite): Promise<Noticia[]> {
        //se erro ou se o retorno nao tiver ultimasnoticias/maislidas, 
        //enviar email avisando
        //retornar erro
        return this.newsService.recuperarHomeInformacoes(layoutType, idSite)
    }
}


