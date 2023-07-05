import { Module } from '@nestjs/common';
import { AlumnosModule } from './alumnos/alumnos.module';
import { CursosModule } from './cursos/cursos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: 'postgres',
      password: 'pgpassword',
      database: 'postgres',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
    }),
    AlumnosModule,
    CursosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
