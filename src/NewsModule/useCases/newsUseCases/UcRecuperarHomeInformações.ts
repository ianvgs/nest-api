/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { NewsService } from 'src/NewsModule/services/news.service';

@Injectable()
export class UcRecuperarHomeInformações {
    constructor(private readonly newsService: NewsService) { }

    async run(): Promise<any> {
        return this.newsService.recuperarHomeInformações()
    }
}


