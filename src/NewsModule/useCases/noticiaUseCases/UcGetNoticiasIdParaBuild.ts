/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { NoticiaService } from 'src/NewsModule/services/noticia.service';


@Injectable()
export class UcGetNoticiasIdParaBuild {
    constructor(private readonly noticiaService: NoticiaService) { }

    async run(idSite: string): Promise<any> {
        return this.noticiaService.getNoticiasParaBuild(idSite);
    }
}
