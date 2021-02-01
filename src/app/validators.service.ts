import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationError } from '@customTypes/validation-error.interface';
import { StringUtilsService } from './string.utils.service';

const PASSWORD_LENGTH = 8;
@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  validNameFormat(control: AbstractControl): ValidationError | null {
    // letter, special, space allowed
    const constrainRegex = /^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F'\s-]*$/;
    return constrainRegex.test(control.value) ? null : { invalidFormat: true };
  }

  validEmailFormat(control: AbstractControl): ValidationError | null {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@[a-zA-Z][a-zA-Z0-9_-]+)(\.\w+(\.\w+)?[^.\W])$/;
    return emailRegex.test(control.value) ? null : { invalidFormat: true };
  }

  validPasswordFormat(control: AbstractControl): ValidationError | null {
    const minlengthPattern = `.{${PASSWORD_LENGTH},}`;
    const lowerCaseRegex = new RegExp(/(?=.*[a-z])/g);
    const upperCaseRegex = new RegExp(/(?=.*[A-Z])/g);
    const minLengthRegex = new RegExp(minlengthPattern, 'g');
    const formValues = control.parent?.value;

    if (!formValues) {
      return null;
    }

    if (
      StringUtilsService.isString(formValues.firstname) &&
      StringUtilsService.isString(formValues.lastname) &&
      StringUtilsService.isString(control.value)
    ) {
      const passwordContainsName = [formValues.firstname, formValues.lastname]
        .filter((substring) => !!substring)
        .some((substring: string) => control.value.includes(substring));

      if (passwordContainsName) {
        return { invalidFormat: true };
      }
    }

    return lowerCaseRegex.test(control.value) &&
      upperCaseRegex.test(control.value) &&
      minLengthRegex.test(control.value)
      ? null
      : { invalidFormat: true };
  }
}
