import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
// Dtos 
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PaginationBookDto } from './dto/pagination-book.dto';

@Injectable()
export class BookService {

  constructor(@InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) { }
  //Create
  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(book);
    return book;
  }
  //Find All - Paginación 
  async findAll(PaginationBookDto: PaginationBookDto) {
    const { limit = 10, offset = 0 } = PaginationBookDto;
    return await this.bookRepository.find({
      take: limit,
      skip: offset
    });
    // return await this.bookRepository.find();
  }
  //Find One
  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id }
    });
    if (!book) {
      throw new NotFoundException(`El libro con el id ${id} no existe`);
    }
    return book;

  }
  //Update
  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.findOne({
      where: { id }
    });
    if (!book) {
      throw new NotFoundException(`El libro con el id ${id} no existe`);
    }
    Object.assign(book, updateBookDto);
    await this.bookRepository.save(book);
    return book;
  }
  // Delete
  async remove(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id }
    });
    if (!book) {
      throw new NotFoundException(`El libro con el id ${id} no existe`);
    }
    await this.bookRepository.remove(book);
    return book;
  }
}
