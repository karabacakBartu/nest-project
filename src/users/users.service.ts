import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { IUpdateUserInputInterface } from './interface/update.user.input.interface';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isEmailExist = await this.usersRepository.isEmailExist(email);
    if (!isEmailExist) {
      return await this.usersRepository.createUser(createUserDto);
    }
    throw new UnprocessableEntityException(
      'User already exist with this email',
    );
  }

  async getUser(userId: string) {
    const userObjId = new Types.ObjectId(userId);

    return await this.usersRepository.getUser(userObjId);
  }

  async updateUser(userUpdateDto: UpdateUserDto, userId: string) {
    const userObjId = new Types.ObjectId(userId);
    const user = await this.usersRepository.getUser(userObjId);

    if (user) {
      const updateUserInputInterface: IUpdateUserInputInterface = {
        name: userUpdateDto.name,
        surname: userUpdateDto.surname,
        email: userUpdateDto.email,
        phoneNumber: userUpdateDto.phoneNumber,
        birthdate: userUpdateDto.birthDate,
        gender: userUpdateDto.gender,
      };

      return await this.usersRepository.updateUser(
        updateUserInputInterface,
        userObjId,
      );
    }

    throw new NotFoundException(
      'There is not user with this id. Please check id.',
    );
  }
}
