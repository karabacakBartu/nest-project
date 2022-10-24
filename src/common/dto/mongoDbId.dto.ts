import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MongoDbIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
