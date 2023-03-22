/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Noticia } from '../entities/noticia.entity';
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';

@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Metodo Get do IdeiaController',
    })
    async getTodasNoticias(): Promise<Noticia[]> {
        return await this.ucRecuperarTodasNoticias.run();
    }


}
