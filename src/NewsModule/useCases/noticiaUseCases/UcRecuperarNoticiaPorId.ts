/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Noticia } from 'src/NewsModule/entities/noticia.entity';
import { NoticiaService } from 'src/NewsModule/services/noticia.service';


@Injectable()
export class UcRecuperarNoticiaPorId {
    constructor(private readonly noticiaService: NoticiaService) { }

    async run(id: number, idSite: number): Promise<Noticia> {
        return this.noticiaService.recuperarNoticiaPorId(id, idSite);
    }
}
