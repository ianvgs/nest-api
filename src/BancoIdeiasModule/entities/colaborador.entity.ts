import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

//ENTITY === MODEL
@Entity('colaborador'/* , { database: 'banco_ideias' } */)
export class Colaborador {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'matricula' })
  matricula: string;

  @Column({ name: 'nomePrefixo' })
  nomePrefixo: string;

  @Column({ name: 'prefixo' })
  prefixo: string;

  @Column({ name: 'nomeUor' })
  nomeUor: string;

  @Column({ name: 'uor' })
  uor: string;

  @Column({ name: 'aceiteTermos' }) //enum
  aceiteTermos: string;

  @Column({ name: 'ativo' }) //enum
  ativo: string;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date
}
