import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import awsConfig from '../config/aws.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [S3Service],
  imports: [
    ConfigModule.forRoot({
      load: [awsConfig],
    }),
  ],
  exports: [S3Service],
})
export class S3Module {}
