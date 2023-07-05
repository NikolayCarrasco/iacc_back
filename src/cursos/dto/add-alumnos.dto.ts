import { IsNotEmpty, IsNumber } from "class-validator";

export class AddAlumnosDto {
  @IsNotEmpty()
  @IsNumber({}, {each: true})
  alumnos: number[];
}