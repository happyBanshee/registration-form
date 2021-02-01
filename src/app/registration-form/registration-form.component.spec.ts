import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidatorsService } from '../validators.service';
import { ValidatorsServiceMock } from '../validators.service.mock';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let mockService: ValidatorsServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationFormComponent],
      providers: [{ provide: ValidatorsService, useClass: ValidatorsServiceMock }]
    }).compileComponents();
    mockService = TestBed.inject(ValidatorsService);
    spyOn(mockService, 'validPasswordFormat');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('passowrd should validate when firstname is updated', () => {
    component.firstname?.setValue('test');
    expect(mockService.validPasswordFormat).toHaveBeenCalledTimes(1);
  });

  it('passowrd should validate when lastname is updated', () => {
    component.lastname?.setValue('test');
    expect(mockService.validPasswordFormat).toHaveBeenCalledTimes(1);
  });
});
