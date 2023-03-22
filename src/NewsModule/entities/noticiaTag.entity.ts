import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//ENTITY === MODEL
@Entity('noticiaTag')
export class NoticiaTag {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'idTag' })
  idTag: number;

  @Column({ name: 'idNoticia' })
  idNoticia: number;

  @Column({ name: 'ativo' })
  ativo: string;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date
}

/* value.format("DD/MM/YYYY hh:mm:ss"); */
