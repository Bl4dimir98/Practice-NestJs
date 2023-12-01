import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { Book } from './book/entities/book.entity';
import { UserModule } from './user/user.module';
import { UserReader } from './user/entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    BookModule,
    TypeOrmModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5366',
      database: 'practice-nestjs', //Aqui va el nombre de la BDD
      autoLoadEntities: true, //Actualiza automáticamente
      synchronize: true, //
      dropSchema: false,// Borra el squema y la data
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    TypeOrmModule.forFeature([Book, UserReader]),
    UserModule,
  ],
  controllers: [
    AppController,
    BookController,
    UserController
  ],
  providers: [
    AppService,
    BookService,
    UserService
  ],
})
export class AppModule { }
