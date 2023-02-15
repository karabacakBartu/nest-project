import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  accessKey: process.env.AWS_S3_ACCESS_KEY,
  secretKey: process.env.AWS_S3_SECRET_KEY,
  bucket: process.env.AWS_S3_BUCKET_NAME,
  keypairId: process.env.AWS_KEY_PAIR_ID,
  CDNUrl: process.env.AWS_CDN_URL,
  privateKeyString: process.env.PRIVATE_KEY_STRING,
}));
