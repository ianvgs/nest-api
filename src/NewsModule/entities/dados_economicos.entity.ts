import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dadosEconomicos')
export class DadosEconomicos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ name: 'indice' })
  indice: string;

  @Column({ name: 'mes' })
  mes: string;

  @Column({ name: 'valor' })
  valor: number;

  @Column({ name: 'valorAcumulado' })
  valorAcumulado: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
