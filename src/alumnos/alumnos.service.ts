import { Injectable } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlumnosService {

  constructor(
    @InjectRepository(Alumno)
    private alumnoRepository: Repository<Alumno>,
  ) {}

  async create(createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    try {
      const newAlumno = this.alumnoRepository.create(createAlumnoDto);
      return await this.alumnoRepository.save(newAlumno);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Alumno[]> {
    return await this.alumnoRepository.find();
  }

  async findOne(id: number): Promise<Alumno> {
    return await this.alumnoRepository.findOneBy({id});
  }

  async update(id: number, updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    try {
      const alumno = await this.alumnoRepository.findOneBy({id});
      if (!alumno) {
        return null;
      } else {
        const updatedAlumno = this.alumnoRepository.merge(alumno, updateAlumnoDto);
        return await this.alumnoRepository.save(updatedAlumno);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const result = await this.alumnoRepository.delete({id});
      return result.affected;
    } catch (error) {
      console.log(error);
    }
  }
}


