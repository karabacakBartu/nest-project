import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientService } from '../client/client.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { IRegisterInputInterface } from './interface/register.input.interface';

@Injectable()
export class AuthService {
  constructor(private readonly clientService: ClientService) {}

  async register(registerDto: RegisterDto) {
    const { password, email, name, surname, gender, phoneNumber, birthDate } =
      registerDto;
    const hashedPass = await this.bcryptHash(password);

    const registerInputInterface: IRegisterInputInterface = {
      email,
      name,
      surname,
      gender,
      phoneNumber,
      birthDate,
      password: hashedPass,
    };

    return await this.clientService.registerUser(registerInputInterface);
  }

  async bcryptHash(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
