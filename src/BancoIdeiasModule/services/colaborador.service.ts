import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from '../entities/colaborador.entity';


@Injectable()
export class ColaboradorService {
  constructor(
    @InjectRepository(Colaborador, 'banco_ideias_connection')
    private readonly colabRepo: Repository<Colaborador>,
  ) { }

  async getColaboradores(): Promise<Colaborador[]> {
    const colabs = await this.colabRepo.find({});
    return colabs;
  }

} 
