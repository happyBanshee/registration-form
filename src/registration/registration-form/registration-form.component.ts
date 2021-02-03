import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationDetails } from '@shared/types/user-details';
import { RegistrationService } from 'src/backend-api/registration.service';
import { ObjectUtils } from '@utils/obj.utils';
import { ValidatorsService } from '../services/validators.service';

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

  firstnameErrorMessages = {
    required: 'Field "First Name" is required',
    invalidFormat:
      'Field "First Name" may only contain letters, spaces and dashes, be between 2- 150 characters'
  };
  lastnameErrorMessages = {
    required: 'Field "Last Name" is required',
    invalidFormat:
      'Field "Last Name" may only contain letters, spaces and dashes, be between 2- 150 characters'
  };
  emailErrorMessages = {
    required: 'Field "Email" is required',
    invalidFormat: 'Field "Email" may only contain letters, digits and dashes'
  };
  passwordErrorMessages = {
    required: 'Field "Password" is required',
    invalidFormat:
      'Field "Password" must follow the format: contain lower and uppercase letters, be between 8 - 150 characters, not contain first- or lastname'
  };
  passwordConfirmationErrorMessages = {
    required: 'Field "Password Confirmation" is required',
    invalidFormat: 'Passwords should match'
  };

  constructor(
    private validationService: ValidatorsService,
    private _snackBar: MatSnackBar,
    private apiService: RegistrationService
  ) {
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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  private mapDetails(): RegistrationDetails | undefined {
    const mappedDetails: RegistrationDetails = {
      email: this.form.value[FormControlNames.Email],
      firstname: this.form.value[FormControlNames.FirstName],
      lastname: this.form.value[FormControlNames.LastName],
      password: this.form.value[FormControlNames.Password]
    };

    if (Object.values(mappedDetails).some((field) => ObjectUtils.isNullOrUndefined(field))) {
      return undefined;
    }

    return mappedDetails;
  }

  submitForm(): void {
    const formDetails = this.mapDetails();

    if (ObjectUtils.isNullOrUndefined(formDetails)) {
      this.showFailedFeedback();
      throw new Error('Unable to parse data to valid format');
    }

    this.apiService.submitRegistrationDetails(formDetails).subscribe({
      next: () => {
        this.showSuccessFeedback(formDetails.email);
      },
      error: (error) => {
        this.showFailedFeedback();
        console.error('There was an error!', error);
      }
    });
  }

  private showSuccessFeedback(email: string): void {
    this.openSnackBar(`Your application for ${email} was successfully submitted`, 'Close');
  }
  private showFailedFeedback(): void {
    this.openSnackBar(`Something went wrong. Your application was not submitted.`, 'Close');
  }
  private createFormControl(validators: ValidatorFn[]): FormControl {
    return new FormControl('', {
      validators: validators,
      updateOn: 'blur'
    });
  }
}
