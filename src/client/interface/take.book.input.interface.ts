import { Types } from 'mongoose';

export interface ITakeBookInputInterface {
  _id: Types.ObjectId;
  bookName: string;
  author: string;
  kind: string;
  vol: number;
  releaseDate: Date;
  takingDate: Date;
  returnDate: Date;
}
