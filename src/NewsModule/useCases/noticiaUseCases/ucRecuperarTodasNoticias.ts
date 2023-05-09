/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Noticia } from 'src/NewsModule/entities/noticia.entity';
import { NoticiaService } from 'src/NewsModule/services/noticia.service';


@Injectable()
export class UcRecuperarTodasNoticias {
    constructor(private readonly noticiaService: NoticiaService) { }

    async run(): Promise<Noticia[]> {
        return this.noticiaService.recuperarTodasNoticias();
    }
}
