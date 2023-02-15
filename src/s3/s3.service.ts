import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3 } from 'aws-sdk';

import { getSignedUrl } from '@aws-sdk/cloudfront-signer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly s3: S3;
  private readonly CDNUrl = this.configService.get<string>('aws.CDNUrl');
  private readonly bucket = this.configService.get<string>('aws.bucket');
  private readonly accessKey = this.configService.get<string>('aws.accessKey');
  private readonly secretKey = this.configService.get<string>('aws.secretKey');
  private readonly keypairId = this.configService.get<string>('aws.keypairId');
  private readonly privateKeyString = this.configService.get<string>(
    'aws.privateKeyString',
  );

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: this.accessKey,
      secretAccessKey: this.secretKey,
    });
  }

  //---------------------------------------------------------------------------/
  //                          PRIVATE FUNCTIONS                                /
  //---------------------------------------------------------------------------/

  async s3_upload(file, name, folder: string) {
    console.log('cdnn', this.CDNUrl);
    console.log('keypairId', this.keypairId);
    const params = {
      Bucket: this.bucket,
      Key: `${folder}/${String(name)}`,
      Body: file,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    const b = await this.s3.upload(params).promise();
    console.log('bbbbb', b);

    return await this.getSignedUrl(folder, name);
  }

  /**
   * Gets a secure CloudFront url of the object (an image in our case),
   *
   * @param folder
   * @param filename
   * @private
   */
  private async getSignedUrl(folder, filename) {
    console.log('efefaf');
    const signingParams = {
      keyPairId: this.keypairId,
      privateKey: this.privateKeyString,
      dateLessThan: '2030-02-10',
      url: `${this.CDNUrl}/${folder}/${filename}`,
    };
    return getSignedUrl(signingParams);
  }
}
