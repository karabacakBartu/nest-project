import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
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
  async login(@Body() authDto: AuthDto) {
    const result = await this.authService.authenticateUser(authDto);
    return { statusCode: 201, data: result, message: 'OK' };
  }

  @UseGuards(CognitoGuard)
  @Post()
  async check(@Body() body) {}
}
