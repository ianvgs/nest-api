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



@Entity('colaborador')
export class Colaborador {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'sobrenome' })
  sobrenome: string;

  @Column({ name: 'apresentacao' })
  apresentacao: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'ativo' })
  ativo: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //Cria a propriedade colaborador.ideias = <Ideia[]>
  @OneToMany(() => Noticia, (noticia) => noticia.colaborador)
  @JoinColumn({ name: 'id' })
  noticias: Noticia[];
}
