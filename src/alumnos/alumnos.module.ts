import { Module } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { AlumnosController } from './alumnos.controller';
import { Alumno } from './entities/alumno.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Alumno])],
  controllers: [AlumnosController],
  providers: [AlumnosService],
  exports: [AlumnosService]
})
export class AlumnosModule {}
