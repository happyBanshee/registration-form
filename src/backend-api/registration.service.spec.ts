import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '@enviroment/environment';
import { RegistrationService } from './registration.service';
import { RegistrationDetailsDto } from 'src/shared/types/user-details';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: jasmine.SpyObj<HttpClient>;
  const spy = jasmine.createSpyObj('HttpClient', ['post']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [{ provide: HttpClient, useValue: spy }]
    });
    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('submitRegistrationDetails should send post request with correct DTO format', () => {
    const testData = {
      lastname: 'test',
      firstname: 'test',
      email: 'test@test.com',
      password: 'Password',
      confirmPassword: 'Password',
      roles: ['user']
    };
    const expected: RegistrationDetailsDto = {
      lastname: testData.lastname,
      firstname: testData.firstname,
      email: testData.email,
      password: testData.password
    };
    service.submitRegistrationDetails(testData);
    expect(httpMock.post).toHaveBeenCalledOnceWith(`${environment.apiUrl}/users`, expected);
  });
});
