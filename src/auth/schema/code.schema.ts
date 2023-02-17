import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CodeDoc = Code & Document;

@Schema({ timestamps: true })
export class Code {
  @Prop()
  code: string;

  @Prop()
  email: string;

  @Prop({ type: Date, expires: 30 })
  createdAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
CodeSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });
