import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  anyo: number;

  @Column()
  semestre: number;

  @Column()
  sede: string;

  @Column("int", { array: true, nullable: true })
  alumnos: number[];

}
