import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { AlumnosModule } from 'src/alumnos/alumnos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Curso]), AlumnosModule],
  controllers: [CursosController],
  providers: [CursosService]
})
export class CursosModule {}
