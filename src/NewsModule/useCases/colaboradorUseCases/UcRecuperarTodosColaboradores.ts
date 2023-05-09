/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ColaboradorService } from '../../services/colaborador.service';

@Injectable()
export class UcRecuperarTodosColaboradores {
  constructor(private readonly colaboradorService: ColaboradorService) { }

  async run() {
    return this.colaboradorService.getColaboradores();
  }
}
