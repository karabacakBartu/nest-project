import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.usersRepository.createUser(createUserDto);
  }
}
