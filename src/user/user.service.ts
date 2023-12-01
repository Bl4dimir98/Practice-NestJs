import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReader } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserReader) private readonly userRepository: Repository<UserReader>) { }

  // Create
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }
  // Find All
  async findAll() {
    return await this.userRepository.find();
  }
  // Find One
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { idUser: id }
    });
    if (!user) {
      throw new NotFoundException(`El usuario con el id ${id} no existe`)
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
