import { ConfigService } from '@nestjs/config';

const getDatabaseUrl = (): string => {
  let user = '';
  let pass = '';
  let url = '';
  let dbName = '';
  switch (process.env.NODE_ENV) {
    case 'dev':
      dbName = process.env['DB_NAME_DEV'];
      user = process.env['DB_USER_DEV'];
      pass = process.env['DB_PASSWORD_DEV'];
      url = process.env['DB_URL_DEV'];
      return (
        'mongodb+srv://' +
        user +
        ':' +
        pass +
        '@' +
        url +
        '/' +
        dbName +
        '?retryWrites=true&w=majority'
      );

    case 'test':
      dbName = process.env['DB_NAME_TEST'];
      user = process.env['DB_USER_TEST'];
      pass = process.env['DB_PASSWORD_TEST'];
      url = process.env['DB_URL_TEST'];

      return (
        'mongodb+srv://' +
        user +
        ':' +
        pass +
        '@' +
        url +
        '/' +
        dbName +
        '?retryWrites=true&w=majority'
      );

    case 'local':
      return 'mongodb://localhost/sosiro';
  }
};

export default getDatabaseUrl;
