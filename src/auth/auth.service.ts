import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ClientService } from '../client/client.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { LoginDto } from './dto/auth.dto';
import { MailService } from '../mailer/mailer.service';
import { InjectModel } from '@nestjs/mongoose';
import { Code, CodeDoc } from './schema/code.schema';
import AWS from 'aws-sdk';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;
  private readonly userPoolId =
    this.configService.get<string>('aws.userPoolId');
  private readonly clientId = this.configService.get<string>('aws.clientId');

  constructor(
    private readonly mailService: MailService,
    private readonly clientService: ClientService,
    private readonly configService: ConfigService,
    @InjectModel(Code.name)
    private readonly codeModel: Model<CodeDoc>,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId,
    });
  }

  //User information send to cognito user pool
  async registerUser(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    new Promise((resolve, reject) => {
      return this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'profile',
            Value: new Types.ObjectId().toHexString(),
          }),
        ],
        null,
        (err, result) => {
          if (result) {
            resolve(result.user);
          } else {
            if (err.name !== 'UsernameExistsException') {
              console.log(err);
              reject(err);
            }
          }
        },
      );
    });

    const code = Math.floor(Math.random() * 1000000 + 1);
    await this.saveCode(code.toString(), email);
    return await this.mailService.example(email, code.toString());
  }

  async login(loginDto: LoginDto) {
    try {
      const tokens = await this.authenticateUser(loginDto);

      const id_token = tokens.getIdToken().getJwtToken();
      const access_token = tokens.getAccessToken().getJwtToken();
      const refresh_token = tokens.getRefreshToken().getToken();
      const userId = tokens.getAccessToken().payload.username;

      return { id_token, access_token, refresh_token, userId };
    } catch (e) {
      if (e.message === 'PreAuthentication failed with error INVALID_CODE.') {
        throw new BadRequestException('INVALID_CODE');
      }
      throw new InternalServerErrorException('Something went wrong.');
    }
  }

  //Authentication phase is here be like login
  async authenticateUser(loginDto: LoginDto): Promise<CognitoUserSession> {
    const { email, password, code } = loginDto;
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
      ValidationData: { code: code.toString() },
    });

    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    //Here  creat tokens and get verify knowledge
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result: CognitoUserSession) {
          resolve(result);
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

  async saveCode(code: string, email: string) {
    await this.codeModel.create({ code, email });
  }

  async invokeLambda(name) {
    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: `pre-auth`,
      Payload: JSON.stringify({
        name,
      }),
    };
    const a = await lambda.invoke(params, function (err, data) {
      if (err) return { err, stack: err.stack };
      else return data;
    });
    console.log(a, 'invoke');
  }
}
