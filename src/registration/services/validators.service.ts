import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { StringUtils } from '@utils/string.utils';

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 150;

export interface ValidationError {
  invalidFormat?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  validNameFormat(control: AbstractControl): ValidationError | null {
    const constrainRegex = new RegExp(/^([\w]+[\s-]?[\w]+[\s-]?)+$/);

    return constrainRegex.test(control.value) ? null : { invalidFormat: true };
  }

  validEmailFormat(control: AbstractControl): ValidationError | null {
    const emailRegex = new RegExp(
      /^((?!\.)[\w-_.]*[^.])(@[a-zA-Z][a-zA-Z0-9_-]+)(\.\w+(\.\w+)?[^.\W])$/,
      'gm'
    );

    return emailRegex.test(control.value) ? null : { invalidFormat: true };
  }

  validPasswordFormat(control: AbstractControl): ValidationError | null {
    const constrainPattern = `(^(?=.*[A-Z])(?=.*[a-z]).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$)`;
    const constrainRegex = new RegExp(constrainPattern);

    return constrainRegex.test(control.value) ? null : { invalidFormat: true };
  }

  passwordsMatch(form: AbstractControl): ValidationError | null {
    const password: string = form.get('password')?.value;
    const passwordConfirmation: string = form.get('passwordConfirmation')?.value;

    if (
      StringUtils.areStrings([password, passwordConfirmation]) &&
      password !== passwordConfirmation
    ) {
      form.get('passwordConfirmation')?.setErrors({ invalidFormat: true });
    }
    return null;
  }

  passwordContainsNoFirstLastName(form: AbstractControl): ValidationError | null {
    const firstname: undefined | string = form.get('firstname')?.value;
    const lastname: undefined | string = form.get('firstname')?.value;
    const password: string = form.get('password')?.value;

    if (
      StringUtils.isString(firstname) &&
      StringUtils.isString(lastname) &&
      StringUtils.isString(password)
    ) {
      const passwordContainsName: boolean = [firstname, lastname]
        .filter((substring) => !!substring)
        .some((substring) => password.toLocaleLowerCase().includes(substring.toLocaleLowerCase()));

      if (passwordContainsName) {
        form.get('password')?.setErrors({ invalidFormat: true });
      }
    }

    return null;
  }
}
