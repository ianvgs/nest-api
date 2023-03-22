/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarTodasCategorias } from '../useCases/categoriaUseCases/UcRecuperarTodasCategorias';
import { Categoria } from '../entities/categoria.entity';


@ApiTags('News categoria')
@Controller('news/categoria')
export class CategoriaController {
  constructor(
    private readonly ucRecuperarTodasCategorias: UcRecuperarTodasCategorias,
  ) { }
  @Get()
  @ApiOperation({
    summary: 'Obtem os dados dos colaboradores.',
  })
  async getTodasCategorias(): Promise<Categoria[]> {
    console.log('Get Categ Controller')
    return await this.ucRecuperarTodasCategorias.run();
  }
}
