//@Node Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { Colaborador } from './entities/colaborador.entity';
import { Categoria } from './entities/categoria.entity';
import { Noticia } from './entities/noticia.entity';
import { Tag } from './entities/tag.entity';
import { NoticiaTag } from './entities/noticiaTag.entity';

import { UcCadastrarNoticia } from './useCases/noticiaUseCases/UcCadastrarNoticia';


//@Controllers
import { NewsController } from './news.controller';
import { NoticiaController } from './controllers/noticia.controller';

//@Services
import { NoticiaService } from './services/noticia.service';

//@UseCases
import { UcRecuperarTodasNoticias } from './useCases/noticiaUseCases/ucRecuperarTodasNoticias';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Colaborador, Categoria, Noticia, Tag, NoticiaTag],
      'news_database2'
    ),
  ],
  controllers: [NewsController, NoticiaController],
  providers: [
    NoticiaService,
    UcRecuperarTodasNoticias,
    UcCadastrarNoticia,

  ],
})
export class NewsModule { }
