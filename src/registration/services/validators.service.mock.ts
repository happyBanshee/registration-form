import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorsService } from './validators.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsServiceMock implements ValidatorsService {
  validNameFormat(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  validEmailFormat(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  validPasswordFormat(control: AbstractControl): ValidationErrors | null {
    console.log('mock called');
    return null;
  }
  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    console.log('mock called');
    return null;
  }
  passwordContainsNoFirstLastName(control: AbstractControl): ValidationErrors | null {
    console.log('mock called');
    return null;
  }
}
