import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly authService: AuthService,
  ) {}

  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto);
    return { statusCode: 201, data: result, message: 'OK' };
  }
}
