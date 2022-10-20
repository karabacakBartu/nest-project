import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type UserDocument=User&Document;

@Schema({timestamps:true})
export class User{

    @Prop()
    username:string;

    @Prop()
    name:string;

    @Prop()
    surname:string


}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 'text', name: 'text', surname: 'text' });