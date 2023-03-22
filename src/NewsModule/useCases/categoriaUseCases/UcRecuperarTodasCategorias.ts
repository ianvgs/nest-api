/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Colaborador } from '../../entities/colaborador.entity';
import { ColaboradorService } from '../../services/colaborador.service';
import { CategoriaService } from 'src/NewsModule/services/categoria.service';

@Injectable()
export class UcRecuperarTodasCategorias {
  constructor(private readonly categoriaService: CategoriaService) { }


  async run() {
    return this.categoriaService.getTodasCategorias();
  }
}
