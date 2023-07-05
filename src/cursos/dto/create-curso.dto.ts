import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCursoDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsNumber()
  @IsNotEmpty()
  anyo: number;

  @IsNumber()
  @IsNotEmpty()
  semestre: number;

  @IsString()
  @IsNotEmpty()
  sede: string;

  @IsOptional()
  @IsNumber({}, {each: true})
  alumnos: number[];

}
