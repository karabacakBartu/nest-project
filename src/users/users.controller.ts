import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create.user.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService:UsersService,
    ) {}

    @Get()
    async getUsers(){
        const result=await this.userService.getUsers();
        const response={statusCode:201,data:result,message:'OK'};
        return response;
        console.log(response,"sdfsdfsd");

    }

    @Post()
    async createUser(@Body() createUserDto:CreateUserDto){
        const result=await this.userService.createUser(createUserDto);
        const response={statusCode:201,data:result,message: 'OK'}
        return response;
    }
}