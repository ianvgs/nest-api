/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UcRecuperarTodasCategorias } from '../useCases/categoriaUseCases/UcRecuperarTodasCategorias';
import { Categoria } from '../entities/categoria.entity';
import { UcRecuperarNoticiasPorCategoria } from '../useCases/categoriaUseCases/UcRecuperarNoticiasPorCategoria';
import { UcCadastrarCategoria } from '../useCases/categoriaUseCases/UcCadastrarCategoria';


@ApiTags('News categoria')
@Controller('news/categoria')
export class CategoriaController {
  constructor(
    private readonly ucRecuperarTodasCategorias: UcRecuperarTodasCategorias,
    private readonly ucRecuperarNoticiasPorCategoria: UcRecuperarNoticiasPorCategoria,
    private readonly ucCadastrarCategoria: UcCadastrarCategoria

  ) { }
  @Get()
  @ApiOperation({
    summary: 'Obtem os dados dos colaboradores.',
  })
  async getTodasCategorias(): Promise<Categoria[]> {
    console.log('chamou')
    return await this.ucRecuperarTodasCategorias.run();
  }

  @Get('/:nomeCategoria')
  @ApiOperation({
    summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
  })
  async getCategoriaEspecifica(@Param('nomeCategoria') nomeCategoria: string): Promise<Categoria> {
    return await this.ucRecuperarNoticiasPorCategoria.run(nomeCategoria);
  }

  @Post()
  async createCategoria(@Body() categoria: Partial<Categoria>): Promise<any> {
    return await this.ucCadastrarCategoria.run(categoria);
  }


}
