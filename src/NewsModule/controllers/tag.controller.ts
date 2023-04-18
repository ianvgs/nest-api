/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Tag } from '../entities/tag.entity';
import { UcRecuperarTodasTags } from '../useCases/tagUseCases/UcRecuperarTodasTags';
import { UcCadastrarTag } from '../useCases/tagUseCases/UcCadastrarTag';


@ApiTags('tag')
@Controller('news/tag')
export class TagController {
  //Injetar no construtor os useCases que deseja utilizar nessa classe e ADICIONAR COMO PROVIDER EM: bancoIdeias.module.ts
  constructor(
    private readonly ucRecuperarTodasTags: UcRecuperarTodasTags,
    private readonly ucCadastrarTag: UcCadastrarTag,


  ) { }

  @Get()
  @ApiOperation({
    summary: 'Metodo Get do TagController',
  })
  async getTodasTags(): Promise<Tag[]> {
    return await this.ucRecuperarTodasTags.run();
  }

  @Post()
  async createTag(@Body() tag: Partial<Tag>): Promise<any> {
    return await this.ucCadastrarTag.run(tag);
  }
}
