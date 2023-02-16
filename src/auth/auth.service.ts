import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientService } from '../client/client.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { IRegisterInputInterface } from './interface/register.input.interface';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;
  private readonly userPoolId =
    this.configService.get<string>('aws.userPoolId');
  private readonly clientId = this.configService.get<string>('aws.clientId');

  constructor(
    private readonly clientService: ClientService,
    private readonly configService: ConfigService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
  }

  registerUser(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  authenticateUser(authDto: AuthDto) {
    const { name, password } = authDto;
    console.log(name, 'name');
    console.log(password, 'password');
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    console.log(userData, 'userData');
    const newUser = new CognitoUser(userData);
    console.log(newUser, 'newUser');
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
  //
  // async register(registerDto: RegisterDto) {
  //   const { password, email, name, surname, gender, phoneNumber, birthDate } =
  //     registerDto;
  //   const hashedPass = await this.bcryptHash(password);
  //
  //   const registerInputInterface: IRegisterInputInterface = {
  //     email,
  //     name,
  //     surname,
  //     gender,
  //     phoneNumber,
  //     birthDate,
  //     password: hashedPass,
  //   };
  //
  //   return await this.clientService.registerUser(registerInputInterface);
  // }

  async bcryptHash(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
