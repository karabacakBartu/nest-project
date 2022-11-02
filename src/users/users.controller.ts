import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';
import { GetUsersResponse } from '../response/schema/getUsersResponse';
import { UpdateUserDto } from './dto/update.user.dto';
import { MongoDbIdDto } from '../common/dto/mongoDbId.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'Users',
    schema: GetUsersResponse,
  })
  async getUsers() {
    const result = await this.userService.getUsers();
    const response = { statusCode: 201, data: result, message: 'OK' };
    return this.responseService.compile(response, GetUsersResponse);
  }

  @Get('/user/:id')
  @ApiOkResponse({
    status: 200,
    description: 'Users',
    schema: GetUsersResponse,
  })
  async getUser(@Param() param) {
    const result = await this.userService.getUser(param.id);
    return { statusCode: 201, data: result, message: 'OK' };
  }

  // @Post('/create-user')
  // async createUser(@Body() createUserDto: CreateUserDto) {
  //   const result = await this.userService.createUser(createUserDto);
  //   return { statusCode: 201, data: result, message: 'OK' };
  // }

  @Post('/:id/update')
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param() param: MongoDbIdDto,
  ) {
    const result = await this.userService.updateUser(updateUserDto, param.id);
    return { statusCode: 201, data: result, message: 'OK' };
  }
}
