import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { AddAlumnosDto } from './dto/add-alumnos.dto';

@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  async create(@Res() res, @Body() createCursoDto: CreateCursoDto): Promise<Curso> {
    const response = await this.cursosService.create(createCursoDto);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating curso',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Curso successfully created',
      response,
    });
  }
  
  @Post(':id/alumnos')
    async addAlumnosInCurso(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() data: AddAlumnosDto) {
      const response = await this.cursosService.addAlumnosInCurso(id, data);
      if(!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error adding alumnos in curso',
        });
      }
      return res.status(HttpStatus.OK).json({
          message: 'Alumnos successfully added in curso',
          curso: response
      });
    }

  @Get()
  async findAll(@Res() res): Promise<Curso[]> {
    const response = await this.cursosService.findAll();
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting cursos',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Cursos successfully retrieved',
      response,
    });
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<Curso> {
    const response = this.cursosService.findOne(id);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting curso',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Curso successfully retrieved',
      response,
    });
  }

  @Get(':id/alumnos')
  async findAlumnosByIdCurso(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<Curso> {
    const response = await this.cursosService.findAlumnosByIdCurso(id);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error getting alumnos by curso',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Alumnos by curso successfully retrieved',
      response,
    });
  }

  @Patch(':id')
  async update(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() updateCursoDto: UpdateCursoDto): Promise<Curso> {
    const response = await this.cursosService.update(id, updateCursoDto);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error updating curso',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Curso successfully updated',
      response,
    });
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<number> {
    const response = await this.cursosService.remove(id);
    if (!response) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error deleting curso',
      });
    }
    return res.status(HttpStatus.OK).json({
      message: 'Curso successfully deleted',
      response,
    });
  }
}
