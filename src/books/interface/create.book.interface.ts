export interface IRegisterInputInterface {
  bookName: string;
  author: string;
  kind: string;
  vol: number;
  releaseDate: Date;
  shelf: IShelf;
}

interface IShelf {
  shelfCategory: string;
  vertical: number;
  horizontal: number;
}
