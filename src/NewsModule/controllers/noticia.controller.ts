/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Noticia } from '../entities/noticia.entity';
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarNoticiaPorId } from '../useCases/noticiaUseCases/UcRecuperarNoticiaPorId';
import { Request } from 'express';

@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias,
        private readonly ucCadastrarNoticia: UcCadastrarNoticia,
        private readonly ucRecuperarNoticiaPorId: UcRecuperarNoticiaPorId

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

    @Get('/:idNoticia')
    @ApiOperation({
        summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
    })
    async getCategoriaEspecifica(@Param('idNoticia') idNoticia: number, @Req() req: Request): Promise<Noticia> {
        const idSite = Number(req?.query.idSite);
        return await this.ucRecuperarNoticiaPorId.run(idNoticia, idSite);
    }


}
