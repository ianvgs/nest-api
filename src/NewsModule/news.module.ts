//@Node Modules
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { Colaborador } from './entities/colaborador.entity';
import { Categoria } from './entities/categoria.entity';
import { Noticia } from './entities/noticia.entity';
import { Tag } from './entities/tag.entity';
import { DadosEconomicos } from './entities/dados_economicos.entity';

//@Controllers
import { NewsController } from './news.controller';
import { NoticiaController } from './controllers/noticia.controller';
import { ColaboradorController } from './controllers/colaborador.controller';
//@Services
import { NoticiaService } from './services/noticia.service';
import { ColaboradorService } from './services/colaborador.service';
//@UseCases
import { UcRecuperarTodasNoticias } from './useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcRecuperarTodosColaboradores } from './useCases/colaboradorUseCases/UcRecuperarTodosColaboradores';
import { CategoriaService } from './services/categoria.service';
import { UcRecuperarTodasCategorias } from './useCases/categoriaUseCases/UcRecuperarTodasCategorias';
import { CategoriaController } from './controllers/categoria.controller';
import { UcRecuperarTodasTags } from './useCases/tagUseCases/UcRecuperarTodasTags';
import { TagController } from './controllers/tag.controller';
import { TagService } from './services/tag.service';
import { NewsService } from './services/news.service';
import { UcRecuperarHomeInformacoes } from './useCases/newsUseCases/UcRecuperarHomeInformacoes';
import { UcRecuperarFormDataNoticia } from './useCases/newsUseCases/UcRecuperarFormDataNoticia';
import { UcCadastrarNoticia } from './useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarNoticiasPorCategoria } from './useCases/categoriaUseCases/UcRecuperarNoticiasPorCategoria';
import { UcRecuperarNoticiaPorId } from './useCases/noticiaUseCases/UcRecuperarNoticiaPorId';
import { UcRecuperarIndicesEconomicos } from './useCases/newsUseCases/UcRecuperarIndicesEconomicos';
import { UcCadastrarCategoria } from './useCases/categoriaUseCases/UcCadastrarCategoria';
import { UcCadastrarTag } from './useCases/tagUseCases/UcCadastrarTag';
import { UcGetNoticiasIdParaBuild } from './useCases/noticiaUseCases/UcGetNoticiasIdParaBuild';
import { ConfigService } from '@nestjs/config';
import { ProjectNameMiddleware } from './middlewares/project-name.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Colaborador, Categoria, Noticia, Tag, DadosEconomicos],
      'news_connection'
    ),
  ],
  controllers: [NewsController, CategoriaController, NoticiaController, TagController, ColaboradorController],
  providers: [
    DadosEconomicos,
    NewsService,
    TagService,
    CategoriaService,
    NoticiaService,
    ColaboradorService,
    UcCadastrarTag,
    UcCadastrarCategoria,
    UcRecuperarIndicesEconomicos,
    UcCadastrarNoticia,
    UcRecuperarNoticiaPorId,
    UcRecuperarNoticiasPorCategoria,
    UcRecuperarFormDataNoticia,
    UcRecuperarHomeInformacoes,
    UcRecuperarTodasTags,
    UcRecuperarTodasNoticias,
    UcRecuperarTodasCategorias,
    UcRecuperarTodosColaboradores,
    UcGetNoticiasIdParaBuild
  ],
})
export class NewsModule implements NestModule {
  //sconstructor(private readonly configService: ConfigService) { }

  configure(consumer: MiddlewareConsumer) {
    //const basePath = this.configService.get<string>('BASE_PATH');
    consumer
      .apply
      (ProjectNameMiddleware)
      .exclude(
      /*        { path: `${basePath}/api/auth`, method: RequestMethod.GET } */
    )
      //a rota até ..../api já está implicita
      .forRoutes('/news');
  }
}
