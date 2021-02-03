import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { ValidatorsService } from './validators.service';

describe('ValidatorsService', () => {
  let service: ValidatorsService;
  let form: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorsService);
    form = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      password: new FormControl('')
    });
  });

  //validNameFormat
  it('Valid name format: "Samantha"', () => {
    form.get('firstname')?.setValue('Samantha');
    expect(service.validNameFormat(form.get('firstname') as FormControl)).toEqual(null);
  });

  it('Valid name format: "Van Dijk"', () => {
    const field = new FormControl('Van Dijk');
    expect(service.validNameFormat(field)).toEqual(null);
  });

  it('Valid name format: "Kos-Rabcewicz-Zubkowski"', () => {
    const field = new FormControl('Kos-Rabcewicz-Zubkowski');
    expect(service.validNameFormat(field)).toEqual(null);
  });

  it('Invalid name format: "÷×"', () => {
    const field = new FormControl('÷×');
    expect(service.validNameFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid name format: "----"', () => {
    const field = new FormControl('----');
    expect(service.validNameFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid name format: ""', () => {
    const field = new FormControl('');
    expect(service.validNameFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid name format: "    "', () => {
    const field = new FormControl('    ');
    expect(service.validNameFormat(field)).toEqual({ invalidFormat: true });
  });
  it('Invalid name format: "Bakker/.="', () => {
    const field = new FormControl('Bakker/.=');
    expect(service.validNameFormat(field)).toEqual({ invalidFormat: true });
  });

  //validEmailFormat
  it('Valid email format: "test@cany.email"', () => {
    const field = new FormControl('test@cany.email');
    expect(service.validEmailFormat(field)).toEqual(null);
  });

  it('Valid email format: "john2day@valid-domain.nl"', () => {
    const field = new FormControl('john2day@valid-domain.nl');
    expect(service.validEmailFormat(field)).toEqual(null);
  });

  it('Invalid email format: "test@c.email"', () => {
    const field = new FormControl('test@c.email');
    expect(service.validEmailFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid email format: "testday@@.email"', () => {
    const field = new FormControl('testday@@.email');
    expect(service.validEmailFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid email format: "testday@.email"', () => {
    const field = new FormControl('testday@.email');
    expect(service.validEmailFormat(field)).toEqual({ invalidFormat: true });
  });

  it('Invalid email format: "testday@.email"', () => {
    const field = new FormControl('testday@.email');
    expect(service.validEmailFormat(field)).toEqual({ invalidFormat: true });
  });
  it('Invalid email format: " test.user,test@domain.com"', () => {
    const field = new FormControl(' test.user,test@domain.com');
    expect(service.validEmailFormat(field)).toEqual({ invalidFormat: true });
  });

  //validPasswordFormat

  it('Valid password format: "Password1"', () => {
    const form = new FormGroup({
      firstname: new FormControl('firstname'),
      lastname: new FormControl('test2'),
      password: new FormControl('Password1')
    });

    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual(null);
  });

  it('Valid password format: "=Password="', () => {
    const form = new FormGroup({
      firstname: new FormControl('firstname'),
      lastname: new FormControl('test2'),
      password: new FormControl('=Password=')
    });

    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual(null);
  });

  it('Invalid password format: "password1!"', () => {
    const form = new FormGroup({
      firstname: new FormControl('firstname'),
      lastname: new FormControl('test2'),
      password: new FormControl('password1!')
    });
    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual({
      invalidFormat: true
    });
  });

  it('Invalid password format: "PASSSWORD1!"', () => {
    const form = new FormGroup({
      firstname: new FormControl('firstname'),
      lastname: new FormControl('test2'),
      password: new FormControl('PASSSWORD1!')
    });
    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual({
      invalidFormat: true
    });
  });

  it('Invalid password format: contains lastname', () => {
    const form = new FormGroup({
      firstname: new FormControl('firstname'),
      lastname: new FormControl('test2'),
      password: new FormControl('test')
    });

    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual({
      invalidFormat: true
    });
  });

  it('Invalid password format: contains firstname', () => {
    const form = new FormGroup({
      firstname: new FormControl('test'),
      lastname: new FormControl('lastname'),
      password: new FormControl('test')
    });

    expect(service.validPasswordFormat(form.get('password') as FormControl)).toEqual({
      invalidFormat: true
    });
  });
});
