import { Types } from 'mongoose';

export interface ICreateBookInterface {
  bookName: string;
  author: string;
  kind: string;
  vol: number;
  releaseDate: Date;
  shelf: IShelf;
  url: string;
}

interface IShelf {
  shelfCategory: string;
  vertical: number;
  horizontal: number;
}
