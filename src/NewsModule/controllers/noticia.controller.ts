import { Body, Controller, Get, Param, Post, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//Types@Models
import { Noticia } from '../entities/noticia.entity';
//UseCases
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarNoticiaPorId } from '../useCases/noticiaUseCases/UcRecuperarNoticiaPorId';
import { UcGetNoticiasIdParaBuild } from '../useCases/noticiaUseCases/UcGetNoticiasIdParaBuild';

@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias,
        private readonly ucCadastrarNoticia: UcCadastrarNoticia,
        private readonly ucRecuperarNoticiaPorId: UcRecuperarNoticiaPorId,
        private readonly ucGetNoticiasIdParaBuild: UcGetNoticiasIdParaBuild

    ) { }

    @Get()
    @ApiOperation({
        summary: 'Metodo Get do IdeiaController',
    })
    async getTodasNoticias(): Promise<Noticia[]> {
        return await this.ucRecuperarTodasNoticias.run();
    }

    @Post()
    async createNoticia(@Body() body: any): Promise<any> {

        return await this.ucCadastrarNoticia.run(body);
    }

    @Get('/:idNoticia')
    @ApiOperation({
        summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
    })
    async getNoticiaEspecifica(@Param('idNoticia') idNoticia: number, @Req() req: Request): Promise<Noticia> {


        const idSite = Number(req?.query.idSite);
        console.log("idSite", idSite)
        const result = await this.ucRecuperarNoticiaPorId.run(idNoticia, idSite);
        console.log("result", result)
        return result
    }

    @Get('/get-to-build/:idSite')
    async getIdsTodasNoticiasParaBuild(@Param('idSite') idSite: string) {
        const result = await this.ucGetNoticiasIdParaBuild.run(idSite);
        return result
    }
}
