//@Node Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { Colaborador } from './entities/colaborador.entity';
import { Categoria } from './entities/categoria.entity';
import { Noticia } from './entities/noticia.entity';
import { Tag } from './entities/tag.entity';

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


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Colaborador, Categoria, Noticia, Tag],
      'news_connection'
    ),
  ],
  controllers: [NewsController, CategoriaController, NoticiaController, TagController, ColaboradorController],
  providers: [
    NewsService,
    TagService,
    CategoriaService,
    NoticiaService,
    ColaboradorService,
    UcCadastrarNoticia,
    UcRecuperarNoticiaPorId,
    UcRecuperarNoticiasPorCategoria,
    UcRecuperarFormDataNoticia,
    UcRecuperarHomeInformacoes,
    UcRecuperarTodasTags,
    UcRecuperarTodasNoticias,
    UcRecuperarTodasCategorias,
    UcRecuperarTodosColaboradores
  ],
})
export class NewsModule { }
