import { Module } from '@nestjs/common';
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {UsersRepository} from "./users.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schema/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name:User.name,schema:UserSchema}
        ])
    ],
    providers: [UsersService,UsersRepository],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
