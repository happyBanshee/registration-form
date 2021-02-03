import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './registration.service';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
  providers: [RegistrationService]
})
export class BackendApiModule {}
