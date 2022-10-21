import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers() {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userModel.create(createUserDto);
  }

  async getUser() {}
}
