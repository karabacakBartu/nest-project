import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ConfigService } from '@nestjs/config';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../users/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class CognitoGuard implements CanActivate {
  private readonly userPool: CognitoUserPool;
  private readonly userPoolId =
    this.configService.get<string>('aws.userPoolId');
  private readonly clientId = this.configService.get<string>('aws.clientId');

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const user = await this.verifyToken(token);
    if (user) {
      request.user = user;
      console.log(request, 'reqqqqq');
      return true;
    }
    throw new BadRequestException('User is not found.');
  }

  async verifyToken(token: string) {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: this.userPoolId,
      tokenUse: 'id',
      clientId: this.clientId,
    });
    console.log(verifier);
    try {
      const payload = await verifier.verify(
        token, // the JWT as string
      );
      const user = await this.getUserInfo(payload.profile.toString());
      console.log(payload);
      return user;
    } catch (e) {
      console.log(e, 'eeee');
      throw new BadRequestException('id token is not valid.');
    }
  }

  /**
   *
   * @param profileId
   */
  async getUserInfo(profileId: string) {
    return await this.UserModel.findOne(
      { _id: profileId },
      { _id: 1, name: 1, surname: 1, email: 1, phoneNumber: 1, gender: 1 },
    ).exec();
  }
}
