import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ClientService } from '../client/client.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
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

  //User information send to cognito user pool
  registerUser(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    return new Promise((resolve, reject) => {
      //Here is user information sending
      return this.userPool.signUp(
        name,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({
            Name: 'profile',
            Value: new Types.ObjectId().toHexString(),
          }),
        ],
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

  //Authentication phase is here be like login
  authenticateUser(authDto: AuthDto) {
    const { name, password } = authDto;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });

    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    //Here  creat tokens and get verify knowledge
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const token = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          };

          return resolve({ statusCode: 200, response: token });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async bcryptHash(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
