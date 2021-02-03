export interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
}

export interface RegistrationDetails extends UserDetails {
  password: string;
}

export interface RegistrationDetailsDto {
  password: string;
  firstname: string;
  lastname: string;
  email: string;
}
