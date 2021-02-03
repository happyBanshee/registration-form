import { Injectable } from '@angular/core';
import { RegistrationDetails, RegistrationDetailsDto } from '@shared/types/user-details';

@Injectable({
  providedIn: 'root'
})
export class MapperService {
  constructor() {}

  mapRegistrationDetailsToDto(obj: RegistrationDetails): RegistrationDetailsDto {
    const mappedObj: RegistrationDetailsDto = {
      email: obj.email,
      firstname: obj.firstname,
      lastname: obj.lastname,
      password: obj.password
    };
    return mappedObj;
  }
}
