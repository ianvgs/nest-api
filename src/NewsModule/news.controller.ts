import { Body, Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarHomeInformacoes } from './useCases/newsUseCases/UcRecuperarHomeInformacoes';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';
import { UcRecuperarIndicesEconomicos } from './useCases/newsUseCases/UcRecuperarIndicesEconomicos';
import { Request } from 'express';


@ApiTags('news')
@Controller('news')
export class NewsController {

  constructor(
    private readonly ucRecuperarHomeInformacoes: UcRecuperarHomeInformacoes,
    private readonly ucRecuperarFormDataNoticia: UcRecuperarFormDataNoticia,
    private readonly ucRecuperarIndicesEconomicos: UcRecuperarIndicesEconomicos,

  ) { }

  @Get()
  @ApiOperation({
    summary: 'Pagina Inicial da aplicação de Notícias',
  })
  getHomePage() {
    return 'Bem Vindo à aplicação Notícias';
  }

  @Get('/home-news/')
  @ApiOperation({
    summary: 'Carregando informações da homepage',
  })
  async getHomeData(@Req() req: Request) {
    const layoutType = Number(req.query.layoutType);
    const idSite = Number(req?.query.layoutType);
    return await this.ucRecuperarHomeInformacoes.run(layoutType, idSite);
  }

  @Get('/cad-noticia-form/')
  @ApiOperation({
    summary: 'Carregando informações da homepage',
  })
  async getCadConfigs() {
    return await this.ucRecuperarFormDataNoticia.run();
  }

  @Get('/dados-economicos-ipca-inpc-igpm/')
  @ApiOperation({
    summary: 'Carregando informações de indices economicos',
  })
  async getindicesEconomicos() {
    return await this.ucRecuperarIndicesEconomicos.run();
  }




}
