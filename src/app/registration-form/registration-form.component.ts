import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { combineLatest, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, last } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StringUtilsService } from '../string.utils.service';
import { ThrowStmt } from '@angular/compiler';
import { ValidatorsService } from '../validators.service';

const USERNAME_MAX_LENGTH = 150;

interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
}

interface RegistrationDetails extends UserDetails {
  password: string;
}

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

@UntilDestroy()
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  controls: RegisrationFormControls = {
    [FormControlNames.FirstName]: new FormControl('', [
      Validators.required,
      Validators.maxLength(USERNAME_MAX_LENGTH),
      this.validationService.validNameFormat
    ]),
    [FormControlNames.LastName]: new FormControl('', [
      Validators.required,
      Validators.maxLength(USERNAME_MAX_LENGTH),
      this.validationService.validNameFormat
    ]),
    [FormControlNames.Email]: new FormControl('', [
      Validators.required,
      this.validationService.validEmailFormat
    ]),
    [FormControlNames.Password]: new FormControl('', [
      Validators.required,
      this.validationService.validPasswordFormat
    ]),
    [FormControlNames.PasswordConfiration]: new FormControl('', [Validators.required])
  };

  form: FormGroup = new FormGroup(this.controls);

  constructor(private validationService: ValidatorsService) {}
  get firstname(): AbstractControl | null {
    return this.form.get(FormControlNames.FirstName);
  }
  get lastname(): AbstractControl | null {
    return this.form.get(FormControlNames.LastName);
  }
  get password(): AbstractControl | null {
    return this.form.get(FormControlNames.Password);
  }
  get passwordConfirmation(): AbstractControl | null {
    return this.form.get(FormControlNames.PasswordConfiration);
  }

  ngOnInit(): void {
    this.firstname?.valueChanges
      .pipe(distinctUntilChanged(), untilDestroyed(this), debounceTime(200))
      .subscribe((_firstname: string) => {
        console.log('firstname updated', _firstname);

        this.password?.updateValueAndValidity();
      });

    this.lastname?.valueChanges
      .pipe(distinctUntilChanged(), untilDestroyed(this), debounceTime(200))
      .subscribe((_lastname: string) => {
        console.log('lastname updated', _lastname);
        this.password?.updateValueAndValidity();
      });

    this.password?.valueChanges
      .pipe(distinctUntilChanged(), untilDestroyed(this), debounceTime(200))
      .subscribe((password: string) => {
        console.log('password updated', password);

        this.passwordConfirmation?.updateValueAndValidity();
      });
  }

  submitForm(): void {
    console.log('form', this.form.status);
  }
}
