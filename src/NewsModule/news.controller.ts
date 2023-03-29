import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarHomeInformacoes } from './useCases/newsUseCases/UcRecuperarHomeInformacoes';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';
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
  async getHomeData() {
    console.log('carregando home news')
    return await this.ucRecuperarHomeInformacoes.run();
  }

  @Get('/cad-noticia-form/')
  @ApiOperation({
    summary: 'Carregando informações da homepage',
  })
  async getCadConfigs() {
    console.log('cad noticia')
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
