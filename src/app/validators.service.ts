import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { ValidationError } from '@customTypes/validation-error';
import { StringUtils } from '@utils/string.utils';
// import { StringUtils } from '../string.utils';

const PASSWORD_LENGTH = 8;

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  validNameFormat(control: AbstractControl): ValidationError | null {
    const constrainRegex = /^(?=.*[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F'\s-]*$)/;

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

    return lowerCaseRegex.test(control.value) &&
      upperCaseRegex.test(control.value) &&
      minLengthRegex.test(control.value)
      ? null
      : { invalidFormat: true };
  }

  passwordsMatch(form: AbstractControl): ValidationError | null {
    const formValues = form.parent?.value;

    if (!formValues) {
      return null;
    }

    return StringUtils.areStrings([formValues.password, formValues.passwordConfirmation]) &&
      formValues.password === formValues.passwordConfirmation
      ? null
      : { invalidFormat: true };
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
        .some((substring) => password.includes(substring));

      if (passwordContainsName) {
        form.get('password')?.setErrors({ invalidFormat: true });
      }
    }

    return null;
  }
}
