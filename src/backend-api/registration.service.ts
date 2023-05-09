import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RegistrationDetails } from '@shared/types/user-details';
import { MapperService } from '@shared/mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient, private mapper: MapperService) { }

  public submitRegistrationDetails(formData: RegistrationDetails): Observable<any> {
    const mappedObj = this.mapper.mapRegistrationDetailsToDto(formData);

    return this.http.post(`${environment.apiUrl}/users`, mappedObj);
  }
}
