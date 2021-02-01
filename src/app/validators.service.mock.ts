import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidatorsService } from './validators.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsServiceMock implements ValidatorsService {
  validNameFormat(control: AbstractControl): { [key: string]: any } | null {
    return null;
  }

  validEmailFormat(control: AbstractControl): { [key: string]: any } | null {
    return null;
  }

  validPasswordFormat(control: AbstractControl): { [key: string]: any } | null {
    console.log('mock called');
    return null;
  }
}
