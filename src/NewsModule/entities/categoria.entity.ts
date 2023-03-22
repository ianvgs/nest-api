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

@Entity('categoria', { database: 'news_database2' })
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'img' })
  img: string;

  @Column({ name: 'bloqueio' })
  bloqueio: string;

  @Column({ name: 'ativo' })
  ativo: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  dataVencimento: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Noticia, (noticia) => noticia.categoria)
  @JoinColumn({ name: 'id' })
  noticias: Noticia[];
}
