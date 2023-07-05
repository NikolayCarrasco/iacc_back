import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alumno {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  edad: number;

  @Column()
  direccion: string;

}