//@Node Modules
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//@Models(entities)
import { Colaborador } from './entities/colaborador.entity';
//@Controllers
import { BancoIdeiasController } from './bancoIdeias.controller';
import { ColaboradorController } from './controllers/colaborador.controller';
//@Services
import { ColaboradorService } from './services/colaborador.service';
//@UseCases
import { UcRecuperarTodosColaboradores } from './useCases/colaborador/UcRecuperarTodosColaboradores';


@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Colaborador,],
      //@Inject-Repository
      'banco_ideias',
    ),
  ],
  controllers: [
    BancoIdeiasController,
    ColaboradorController,
  ],
  providers: [
    ColaboradorService,

    UcRecuperarTodosColaboradores,

  ],
})
export class BancoIdeiasModule { }
