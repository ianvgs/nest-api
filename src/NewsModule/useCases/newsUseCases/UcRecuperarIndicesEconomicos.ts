/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NewsService } from 'src/NewsModule/services/news.service';

@Injectable()
export class UcRecuperarIndicesEconomicos {
    constructor(private readonly newsService: NewsService) { }

    async run(): Promise<any[]> {
        //se erro ou se o retorno nao tiver ultimasnoticias/maislidas, 
        //enviar email avisando
        //retornar erro
        return this.newsService.recuperarDadosIndicesEconomicos()
    }
}


