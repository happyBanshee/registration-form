import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatorsService } from '../services/validators.service';
import { ValidatorsServiceMock } from '../services/validators.service.mock';
import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let mockService: ValidatorsServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, HttpClientModule],
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

  it('password should validate when firstname is updated', () => {
    component.firstname?.setValue('test');
    expect(mockService.validPasswordFormat).toHaveBeenCalledTimes(1);
  });

  it('password should validate when lastname is updated', () => {
    component.lastname?.setValue('test');
    expect(mockService.validPasswordFormat).toHaveBeenCalledTimes(1);
  });
});
