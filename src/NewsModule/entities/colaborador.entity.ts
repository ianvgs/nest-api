import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Noticia } from './noticia.entity';

@Entity('colaborador', { database: 'news_database2' })
export class Colaborador {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'ativo' })
  ativo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Noticia, (noticia) => noticia.colaborador)
  @JoinColumn({ name: 'id' })
  noticias: Noticia[];
}
