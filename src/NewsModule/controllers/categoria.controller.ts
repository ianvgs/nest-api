/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarTodasCategorias } from '../useCases/categoriaUseCases/UcRecuperarTodasCategorias';
import { Categoria } from '../entities/categoria.entity';
import { UcRecuperarNoticiasPorCategoria } from '../useCases/categoriaUseCases/UcRecuperarNoticiasPorCategoria';


@ApiTags('News categoria')
@Controller('news/categoria')
export class CategoriaController {
  constructor(
    private readonly ucRecuperarTodasCategorias: UcRecuperarTodasCategorias,
    private readonly ucRecuperarNoticiasPorCategoria: UcRecuperarNoticiasPorCategoria

  ) { }
  @Get()
  @ApiOperation({
    summary: 'Obtem os dados dos colaboradores.',
  })
  async getTodasCategorias(): Promise<Categoria[]> {
    console.log('Get Categ Controller')
    return await this.ucRecuperarTodasCategorias.run();
  }

  @Get('/:nomeCategoria')
  @ApiOperation({
    summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
  })
  async getCategoriaEspecifica(@Param('nomeCategoria') nomeCategoria: string): Promise<Categoria> {
    return await this.ucRecuperarNoticiasPorCategoria.run(nomeCategoria);
  }
}
