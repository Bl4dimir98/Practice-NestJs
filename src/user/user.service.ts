import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BookEntity } from 'src/book/entities/book.entity';
import { PaginacionDto } from '../common/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ) { }

  // Create
  async create(createUserDto: CreateUserDto) {
    try {
      const { bookTitle = [], ...bookDetails } = createUserDto;
      const users = this.userRepository.create(
        {
          ...bookDetails,
          bookTitle: bookTitle.map(bookTitle => this.bookRepository.create({ title: bookTitle }))
        }
      );
      await this.userRepository.save(users);
      return { ...users, bookTitle }

    } catch (error) {
      console.log(error);
      throw new Error('No se pudo enviar la data a la BDD');
    }
  }
  // Find All
  async findAll(paginacionDto: PaginacionDto) {
    const { limit = 10, offset = 1 } = paginacionDto;
    const users = await this.userRepository.find({
      take: limit,
      skip: offset,
      relations: {
        bookTitle: true
      }
    });
    return users.map(user => (
      {
        ...user,
        bookTitle: user.bookTitle.map(namep => namep.title)
      }
    ));
  }
  // Find One
  async findOne(idUser: number) {
    const user = await this.userRepository.findOneBy({ idUser })
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${user.idUser} no existe`)
    }
    return user;
  }
  // Update the data
  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const users = await this.userRepository.preload({
      idUser: idUser,
      ...updateUserDto,
      bookTitle: []
    });
    if (!users)
      throw new NotFoundException(`Error! No se puedo actualizar`);
    await this.userRepository.save(users);
    return users;
  }
  // Delete the data
  async remove(idUser: number) {
    const user = await this.findOne(idUser);
    await this.userRepository.delete(idUser);
    return user;
  }
}
