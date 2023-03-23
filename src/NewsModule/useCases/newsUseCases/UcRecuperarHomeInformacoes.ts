/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Noticia } from 'src/NewsModule/entities/noticia.entity';
import { NewsService } from 'src/NewsModule/services/news.service';

@Injectable()
export class UcRecuperarHomeInformacoes {
    constructor(private readonly newsService: NewsService) { }

    async run(): Promise<Noticia[]> {
        return this.newsService.recuperarHomeInformacoes()
    }
}


