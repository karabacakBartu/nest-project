import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResponseService } from '../response/response.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly responseService: ResponseService) {}
}
