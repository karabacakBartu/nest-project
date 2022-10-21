import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validateGender } from '../../helper';

@ValidatorConstraint({ name: 'ValidGender', async: true })
export class IsGenderValidConstraint implements ValidatorConstraintInterface {
  validate(gender: any) {
    if (gender) {
      return validateGender(gender);
    }
    return false;
  }
}

export function IsGenderValid(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidGender',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGenderValidConstraint,
    });
  };
}
