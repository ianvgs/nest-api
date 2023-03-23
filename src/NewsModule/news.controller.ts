import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarHomeInformacoes } from './useCases/newsUseCases/UcRecuperarHomeInformacoes';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';

@ApiTags('news')
@Controller('news')
export class NewsController {

  constructor(
    private readonly ucRecuperarHomeInformacoes: UcRecuperarHomeInformacoes,
    private readonly ucRecuperarFormDataNoticia: UcRecuperarFormDataNoticia,

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
}
