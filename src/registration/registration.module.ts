import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ValidatorsService } from './services/validators.service';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendApiModule } from 'src/backend-api/backend-api.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RegistrationFormComponent, RegistrationPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    BackendApiModule,
    HttpClientModule
  ],
  providers: [ValidatorsService],
  exports: [RegistrationFormComponent, RegistrationPageComponent]
})
export class RegistrationModule {}
