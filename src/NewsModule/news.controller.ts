import { Controller, Get, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';
import { UcRecuperarHomeInformacoes } from './useCases/newsUseCases/UcRecuperarHomeInformacoes';
import { UcRecuperarIndicesEconomicos } from './useCases/newsUseCases/UcRecuperarIndicesEconomicos';


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
    const idSite = Number(req?.query.idSite);

    return await this.ucRecuperarHomeInformacoes.run(layoutType, idSite);
  }

  @Get('/cad-noticia-form/')
  @ApiOperation({
    summary: 'Carregando informações da homepage',
  })
  async getCadConfigs(@Req() req: Request) {
    const idSite = Number(req?.query.idSite);

    return await this.ucRecuperarFormDataNoticia.run(idSite);
  }

  @Get('/dados-economicos-ipca-inpc-igpm/')
  @ApiOperation({
    summary: 'Carregando informações de indices economicos',
  })
  async getindicesEconomicos() {
    return await this.ucRecuperarIndicesEconomicos.run();
  }
}
