import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Colaborador } from './colaborador.entity';
import { Categoria } from './categoria.entity';

import { Tag } from './tag.entity';

@Entity('noticia', { database: 'news_database2' })
export class Noticia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'titulo' })
  titulo: string;

  @Column({ name: 'resumo' })
  resumo: string;

  @Column({ name: 'observacao' })
  observacao: string;

  @Column({ name: 'idCategoria' })
  idCategoria: number;

  @Column({ name: 'idColaborador' })
  idColaborador: number;

  @Column({ name: 'ativo' })
  ativo: string;

  //default pra nao precisar passar na chamada
  @CreateDateColumn(/* { default: new Date() } */)
  createdAt: Date;

  //default pra nao precisar passar na chamada
  @UpdateDateColumn(/* { default: new Date() } */)
  updatedAt: Date;

  @ManyToOne(() => Categoria, (categoria) => categoria.noticias)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.noticias)
  @JoinColumn({ name: 'idColaborador' })
  colaborador: Colaborador;

  @ManyToMany(() => Tag, (tag) => tag.noticias)
  @JoinTable({
    name: 'noticiaTag',
    //tabela auxiliar ideiaTag(ideia+tag)
    joinColumn: {
      //coluna da model ideiaTag
      name: 'idNoticia',
      foreignKeyConstraintName: 'fk_dept_user',
    },
    inverseJoinColumn: {
      //coluna dessa model
      referencedColumnName: 'id',
      name: 'id',
      foreignKeyConstraintName: 'fk_dept_dept',
    },
  })
  tags: Tag[];
}
