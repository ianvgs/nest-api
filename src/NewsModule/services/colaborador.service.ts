import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from '../entities/colaborador.entity';

@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador, 'news_database2')
    private readonly colabRepo: Repository<Colaborador>,
  ) { }

  async getColaboradores(): Promise<Colaborador[]> {
    const colabs = await this.colabRepo.find({
      relations: { noticias: true },
    });
    return colabs;
  }

  async getDadosColaborador(id): Promise<Colaborador> {
    const dadosColaborador = await this.colabRepo.findOne({
      where: {
        id,
      },
    });

    return dadosColaborador;
  }
}
