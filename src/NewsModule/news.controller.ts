import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarHomeInformações } from './useCases/newsUseCases/UcRecuperarHomeInformações';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';

@ApiTags('news')
@Controller('news')
export class NewsController {

  constructor(
    private readonly ucRecuperarHomeInformações: UcRecuperarHomeInformações,
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
    return await this.ucRecuperarHomeInformações.run();
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
