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

@Entity('noticia')
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


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => Colaborador, (colaborador) => colaborador.noticias)
  @JoinColumn({ name: 'idColaborador' })
  colaborador: Colaborador;


  @ManyToOne(() => Categoria, (categoria) => categoria.noticias)
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @ManyToMany(() => Tag, (tag) => tag.noticias)
  @JoinTable({
    name: 'noticiaTag'
  })
  tags: Tag[];
  //JSON
  /* {	
    "titulo":"Como ganhar um milhão",
    "resumo":"resumo de como ganhar um milhao",
    "observacao":"de como ganhar um milhoa",
    "idCategoria":"1",
    "idColaborador":"1",
    "ativo":"S",
    "tags":[{"id":"1"}]
  } */
}
