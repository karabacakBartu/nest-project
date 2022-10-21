import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { validatePhone } from '../../helper';

@ValidatorConstraint({ name: 'ValidPhone', async: true })
export class IsPhoneNumberValidConstraint
  implements ValidatorConstraintInterface
{
  validate(phone: any) {
    if (phone) {
      return validatePhone(phone);
    }
    return false;
  }
}

export function IsPhoneNumberValid(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'ValidPhone',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneNumberValidConstraint,
    });
  };
}
