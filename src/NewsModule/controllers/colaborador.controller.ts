/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Colaborador } from '../entities/colaborador.entity';
import { UcRecuperarTodosColaboradores } from '../useCases/colaboradorUseCases/UcRecuperarTodosColaboradores';
//Agrupa as Api Operations na ApiTag
@ApiTags('News colaborador')
@Controller('news/colaborador')
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
