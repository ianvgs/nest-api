import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//Types@Models
import { Noticia } from '../entities/noticia.entity';
//UseCases
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarNoticiaPorId } from '../useCases/noticiaUseCases/UcRecuperarNoticiaPorId';
import { UcGetNoticiasIdParaBuild } from '../useCases/noticiaUseCases/UcGetNoticiasIdParaBuild';

//@GUARDS
import { JwtAuthGuard } from '../../AuthPackageModule/auth/guards/jwt-auth-guard';
import { CurrentUser } from 'src/AuthPackageModule/auth/decorators/current-user.decorator';
import { ROOT_ADMIN_USER } from 'src/AuthPackageModule/constants';

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


    @UseGuards(JwtAuthGuard)
    @Post()
    async createNoticia(@Body() body: any, @CurrentUser() user: any): Promise<any> {

        console.log(user)
        console.log(body)

        if (!user.admin && user.appId != body.idSite) {
            throw new BadRequestException('Usuario não autorizado a criar novas noticias para esta aplicação.');
        }
        console.log("Usuario autenticado a realizar gravações de noticias para o site", user.appId)
        console.log("Realizando criação de noticia para o app", body.idSite)

        return await this.ucCadastrarNoticia.run(body);
    }

    @Get('/:idNoticia')
    @ApiOperation({
        summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
    })
    async getNoticiaEspecifica(@Param('idNoticia') idNoticia: number, @Req() req: Request): Promise<Noticia> {
        const idSite = Number(req?.query.idSite);
        const result = await this.ucRecuperarNoticiaPorId.run(idNoticia, idSite);
        return result
    }

    @Get('/get-to-build/:idSite')
    async getIdsTodasNoticiasParaBuild(@Param('idSite') idSite: string) {
        const result = await this.ucGetNoticiasIdParaBuild.run(idSite);
        return result
    }
}
