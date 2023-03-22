/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Noticia } from '../entities/noticia.entity';
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';

@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias,
        private readonly ucCadastrarNoticia: UcCadastrarNoticia,

    ) { }

    @Get()
    @ApiOperation({
        summary: 'Metodo Get do IdeiaController',
    })
    async getTodasNoticias(): Promise<Noticia[]> {
        return await this.ucRecuperarTodasNoticias.run();
    }

    @Post()
    async createNoticia(@Body() noticia: Partial<Noticia>): Promise<any> {
        return await this.ucCadastrarNoticia.run(noticia);
    }


}
