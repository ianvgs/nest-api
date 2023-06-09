/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { NewsService } from 'src/NewsModule/services/news.service';



@Injectable()
export class UcRecuperarFormDataNoticia {
    constructor(private readonly newsService: NewsService) { }

    async run(idSite: number): Promise<any> {
        return this.newsService.recuperarNoticiaFormData(idSite)
    }
}


