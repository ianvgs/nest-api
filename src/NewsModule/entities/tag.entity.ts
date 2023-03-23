import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Noticia } from './noticia.entity';

@Entity('tag')
export class Tag {

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'tag' })
  tag: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @Column({ name: 'ativo' })
  ativo: string;

  @Column({ name: 'color' })
  color: string;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date

  @ManyToMany(() => Noticia, (noticia) => noticia.tags)
  noticias: Noticia[];
}
