import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  birthDate: Date;

  @Prop({
    default(): number {
      return 6;
    },
  })
  bookRights: number;

  @Prop()
  gender: string;

  @Prop({
    default(): string {
      return 'Empty';
    },
  })
  takenBooks: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 'text', name: 'text', surname: 'text' });
