/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Noticia } from '../entities/noticia.entity';

import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';

@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucCadastrarNoticia: UcCadastrarNoticia,
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias

    ) { }

    @Get()
    @ApiOperation({
        summary: 'Metodo Get do IdeiaController',
    })
    async getTodasNoticias(): Promise<Noticia[]> {
        return await this.ucRecuperarTodasNoticias.run();
    }

    /*  @Get('/:id')
     @ApiOperation({
         summary: 'Recupera ideia por ID, trazendo proponente e tags',
     })
     async getIdeiaEspecífica(@Param('id') idIdeia: number): Promise<Noticia> {
     } */


    /* @ApiParam({
      Partial<Tag>
      "tag":"titleTest",
      "descricao":"mandando do insomnia"
    }) */

    @Post()
    @ApiOperation({
        summary: 'Criar notícia',
    })
    async createNoticia(@Body() noticia: Partial<Noticia>): Promise<any> {

        console.log('entra')
        return await this.ucCadastrarNoticia.run(noticia);
    }
}
