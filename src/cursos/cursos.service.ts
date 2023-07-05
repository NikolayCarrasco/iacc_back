import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curso } from './entities/curso.entity';
import { Repository } from 'typeorm';
import { Alumno } from 'src/alumnos/entities/alumno.entity';
import { AlumnosService } from 'src/alumnos/alumnos.service';
import { AddAlumnosDto } from './dto/add-alumnos.dto';

@Injectable()
export class CursosService {

  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
    private alumnosService: AlumnosService,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<Curso> {
    try {
      const newCurso = this.cursoRepository.create(createCursoDto);
      return await this.cursoRepository.save(newCurso);
    } catch (error) {
      console.log(error);
    }
  }

  async addAlumnosInCurso(id: number, data: AddAlumnosDto) {
    try {
      const curso = await this.findOne(id);
      if(!curso) {
          return null;
      }
      if(!curso.alumnos) {
          curso.alumnos = data.alumnos
      } else {
          curso.alumnos = [...curso.alumnos, ...data.alumnos]
      }
      return this.cursoRepository.save(curso);
    } catch (error) {
        console.log(error);
    }
}

  async findAll(): Promise<Curso[]> {
    return await this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    return await this.cursoRepository.findOneBy({id});
  }

  async findAlumnosByIdCurso(id: number): Promise<Alumno[]> {
    try {
      const curso = await this.findOne(id);      
      if(!curso) {
        return null;
      }
      if(!curso.alumnos?.length) {
        return [];
      }
      const alumnos = await this.alumnosService.findAll();
      return alumnos.filter(alumno => curso.alumnos.includes(alumno.id));      
    } catch (error) {
        console.log(error);
    }
}

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<Curso> {
    try {
      const curso = await this.cursoRepository.findOneBy({id});
      if (!curso) {
        return null;
      } else {
        const updatedCurso = this.cursoRepository.merge(curso, updateCursoDto);
        return await this.cursoRepository.save(updatedCurso);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<number> {
    try {
      const result = await this.cursoRepository.delete({id});
      return result.affected;
    } catch (error) {
      console.log(error);
    }
  }
}
