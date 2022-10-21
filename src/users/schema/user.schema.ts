import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  surname: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 'text', name: 'text', surname: 'text' });
