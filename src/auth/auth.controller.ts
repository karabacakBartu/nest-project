import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CognitoGuard } from './interface/cognito.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}
  //
  // async register(@Body() registerDto: RegisterDto) {
  //   const result = await this.authService.register(registerDto);
  //   return { statusCode: 201, data: result, message: 'OK' };
  // }

  @Post('register')
  async registerAuth(@Body() registerDto: RegisterDto) {
    const result = await this.authService.registerUser(registerDto);
    return { statusCode: 201, data: result, message: 'OK' };
  }

  @Post('req')
  @ApiBadRequestResponse({
    status: 400,
    description: 'When the code is invalid.',
  })
  async login(@Body() authDto: LoginDto) {
    const result = await this.authService.login(authDto);
    return { statusCode: 201, data: result, message: 'OK' };
  }

  @UseGuards(CognitoGuard)
  @Post('try')
  async check(@Body() body) {}
}
