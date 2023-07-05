import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';
import { Alumno } from './entities/alumno.entity';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Post()
  async create(@Res() res, @Body() createAlumnoDto: CreateAlumnoDto): Promise<Alumno> {
    try {
      const response = await this.alumnosService.create(createAlumnoDto);
      if (!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error creating alumno'
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Alumno created successfully',
        response
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Alumno[]> {
    try {
      const response = await this.alumnosService.findAll();
      if (!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error getting alumnos'
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Alumnos retrieved successfully',
        response
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<Alumno> {
    try {
      const response = await this.alumnosService.findOne(id);
      if (!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error getting alumno'
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Alumno retrieved successfully',
        response
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(@Res() res, @Param('id') id: string, @Body() updateAlumnoDto: UpdateAlumnoDto): Promise<Alumno> {
    try {
      const response = await this.alumnosService.update(+id, updateAlumnoDto);
      if (!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error updating alumno'
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Alumno updated successfully',
        response
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id', ParseIntPipe) id: number): Promise<number> {
    try {
      const response = await this.alumnosService.remove(id);
      if (!response) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Error deleting alumno'
        });
      }
      return res.status(HttpStatus.OK).json({
        message: 'Alumno deleted successfully',
        response
      });
    } catch (error) {
      console.log(error);
    }
  }
}
