/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Colaborador } from '../entities/colaborador.entity';
import { UcRecuperarTodosColaboradores } from '../useCases/colaborador/UcRecuperarTodosColaboradores';
import { Categoria } from 'src/NewsModule/entities/categoria.entity';
//Agrupa as Api Operations na ApiTag
@ApiTags('Banco de Ideias')
@Controller('banco-ideias/colaborador')
export class ColaboradorController {
  constructor(
    private readonly ucRecuperarTodosColaboradores: UcRecuperarTodosColaboradores,
  ) { }
  @Get()
  @ApiOperation({
    summary: 'Obtem os dados dos colaboradores.',
  })
  async getDadosColaborador(): Promise<Colaborador[]> {
    return await this.ucRecuperarTodosColaboradores.run();
  }


}
