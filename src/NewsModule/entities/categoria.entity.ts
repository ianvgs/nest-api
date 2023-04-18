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

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'sufixurl' })
  sufixurl: string;

  @Column({ name: 'descricao' })
  descricao: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ name: 'idSite' })
  idSite: number;

  //Cria a propriedade evento.ideias = <Ideias[]>
  @OneToMany(() => Noticia, (noticia) => noticia.categoria)
  @JoinColumn({ name: 'id' })
  noticias: Noticia[];
}
