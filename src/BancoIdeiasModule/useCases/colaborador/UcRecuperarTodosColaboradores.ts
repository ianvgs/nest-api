/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Colaborador } from '../../entities/colaborador.entity';
import { ColaboradorService } from '../../services/colaborador.service';

@Injectable()
export class UcRecuperarTodosColaboradores {
  constructor(private readonly colaboradorService: ColaboradorService) {}

  async run() {
    return this.colaboradorService.getColaboradores();
  }
}
