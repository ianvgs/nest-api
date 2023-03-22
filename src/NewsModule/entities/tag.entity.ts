import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Noticia } from './noticia.entity';

@Entity('tag', { database: 'news_database2' })
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

  @ManyToMany(() => Tag, (tag) => tag.noticias)
  @JoinTable({
    name: 'ideiaTag',
    //tabela auxiliar ideiaTag(ideia+tag)
    joinColumn: {
      //coluna da model ideiaTag
      name: 'idTag',
      foreignKeyConstraintName: 'fk_dept_user',
    },
    inverseJoinColumn: {
      //coluna dessa entidade pra dar join
      referencedColumnName: 'id',
      name: 'id',
      foreignKeyConstraintName: 'fk_dept_dept',
    },
  })
  noticias: Noticia[];
}
