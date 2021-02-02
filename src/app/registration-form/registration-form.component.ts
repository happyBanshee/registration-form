import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorsService } from '../validators.service';

const USERNAME_MAX_LENGTH = 150;

enum FormControlNames {
  FirstName = 'firstname',
  LastName = 'lastname',
  Email = 'email',
  Password = 'password',
  PasswordConfiration = 'passwordConfirmation'
}

type RegisrationFormControls = {
  [key in FormControlNames]: FormControl;
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  firstname!: FormControl;
  lastname!: FormControl;
  email!: FormControl;
  password!: FormControl;
  passwordConfirmation!: FormControl;
  controls!: RegisrationFormControls;
  form!: FormGroup;
  hide = true;

  constructor(private validationService: ValidatorsService) {
    this.firstname = this.createFormControl([
      Validators.required,
      Validators.maxLength(USERNAME_MAX_LENGTH),
      this.validationService.validNameFormat
    ]);
    this.lastname = this.createFormControl([
      Validators.required,
      Validators.maxLength(USERNAME_MAX_LENGTH),
      this.validationService.validNameFormat
    ]);
    this.email = this.createFormControl([
      Validators.required,
      this.validationService.validEmailFormat
    ]);
    this.password = this.createFormControl([
      Validators.required,
      this.validationService.validPasswordFormat
    ]);
    this.passwordConfirmation = this.createFormControl([Validators.required]);

    this.controls = {
      [FormControlNames.FirstName]: this.firstname,
      [FormControlNames.LastName]: this.lastname,
      [FormControlNames.Email]: this.email,
      [FormControlNames.Password]: this.password,
      [FormControlNames.PasswordConfiration]: this.passwordConfirmation
    };
    this.form = new FormGroup(this.controls, [
      this.validationService.passwordContainsNoFirstLastName,
      this.validationService.passwordsMatch
    ]);
  }

  submitForm(): void {
    console.log('form', this.form.status);
  }

  private createFormControl(validators: ValidatorFn[]): FormControl {
    return new FormControl('', {
      validators: validators,
      updateOn: 'blur'
    });
  }
}
