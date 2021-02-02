export interface UserDetails {
  firstname: string;
  lastname: string;
  email: string;
}

interface RegistrationDetails extends UserDetails {
  password: string;
}
