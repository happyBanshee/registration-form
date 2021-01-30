import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

const USERNAME_MAX_LENGTH = 150;
const PASSWORD_LENGTH = 8;

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

type FormFields = keyof UserDetails | 'passwordConfirmation';

type UserFormControls = {
  [key in FormFields]: FormControl;
};
type UserFormGroup = FormGroup & { value: UserDetails, controls: UserFormControls };

@Component({
  selector: "app-registration-form",
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  controls: UserFormControls = {
    firstname: new FormControl('', [Validators.required, Validators.maxLength(USERNAME_MAX_LENGTH), validNameFormat()]),
    lastname: new FormControl('', [Validators.required, Validators.maxLength(USERNAME_MAX_LENGTH), validNameFormat()]),
    email: new FormControl('', [Validators.required, validEmail]),
    password: new FormControl('', [Validators.required, validPassword()]),
    passwordConfirmation: new FormControl('', [Validators.required])
  };

  form: UserFormGroup = new FormGroup(this.controls, [matchPassword()]) as UserFormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(): void {
    console.log('form', this.form.status);
  }
}

export function validNameFormat(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // letter, special, space allowed 
    const constrainRegex = /^[a-zA-Z\u0041-\u024F'\s-]*$/;

    return constrainRegex.test(control.value) ? null : { invalidName: { value: control.value } };
  }
}

export function validEmail(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@[a-zA-Z][a-zA-Z0-9_-]+)(\.\w+(\.\w+)?[^.\W])$/;

    return emailRegex.test(control.value) ? null : { invalidName: { value: control.value } };
  }
}

export function validPassword(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const minLength = /.{8,}/g;

    switch (true) {
      case lowerCaseRegex.test(control.value):
      case upperCaseRegex.test(control.value):
      case minLength.test(control.value):
        return null;
      default:
        return { error: { value: "INVALID PASSWORD" } };
    }
  }
}

export function matchPassword(): ValidatorFn {
  return (form: AbstractControl): { [key: string]: any } | null => {
    const fields: UserFormControls = form.value;
    console.log('form.fields', fields);
    // no user's firstname or lasname
    if (!fields.password.value || !fields.passwordConfirmation.value) {
      return null;
    }

    return fields.password.value === fields.passwordConfirmation.value ? null : { error: { value: "password do not match" } };
  }
}
