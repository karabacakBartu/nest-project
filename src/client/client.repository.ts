import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schema/user.schema';
import { ITakeBookInputInterface } from './interface/take.book.input.interface';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  /**
   *
   *  Add book informations to the takenBooks field for taken books.
   *
   * @param takeBookInputInterface
   * @param clientId
   */
  async takeBook(
    takeBookInputInterface: ITakeBookInputInterface,
    clientId: Types.ObjectId,
  ) {
    return await this.UserModel.updateOne(
      {
        _id: clientId,
        bookRights: { $gte: 0 },
        'takenBooks._id': { $ne: takeBookInputInterface._id },
      },
      {
        $push: { takenBooks: takeBookInputInterface },
        $inc: { bookRights: -1 },
      },
      { setDefaultsOnInsert: true, new: true },
    ).exec();
  }

  async getUser(userId: Types.ObjectId) {
    return await this.UserModel.findOne({ _id: userId }).exec();
  }

  async rebateBook(
    clientId: Types.ObjectId,
    bookId: Types.ObjectId,
    bookName: string,
  ) {
    const match = {
      _id: clientId,
      'takenBooks._id': bookId,
    };

    const a = await this.UserModel.findOne(match);
    console.log(a);

    return await this.UserModel.updateOne(
      {},
      {
        $pull: { takenBooks: { _id: bookId } },
      },
    ).exec();
  }
}