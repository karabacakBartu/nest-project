import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';

@Injectable()
export class ResponseService {
  private readonly ajv;

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      removeAdditional: true,
      useDefaults: true,
      strict: false,
    });
  }

  compile(data, schema) {
    const d = JSON.parse(JSON.stringify(data));
    const validate = this.ajv.compile(schema);
    validate(d);
    return d;
  }
}
