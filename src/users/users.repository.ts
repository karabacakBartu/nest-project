import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create.user.dto';
import { IUpdateUserInputInterface } from './interface/update.user.input.interface';

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

  async getUser(userId: Types.ObjectId) {
    const match = {
      _id: userId,
    };

    return await this.userModel.findOne(match).exec();
  }

  async isEmailExist(email: string) {
    const match = {
      email,
    };

    const isExist = await this.userModel.exists(match).exec();
    return !!isExist;
  }

  async updateUser(
    updateUserInputInterface: IUpdateUserInputInterface,
    userId: Types.ObjectId,
  ) {
    const match = {
      _id: userId,
    };

    const update = updateUserInputInterface;

    return await this.userModel.updateOne(match, update).exec();
  }
}
