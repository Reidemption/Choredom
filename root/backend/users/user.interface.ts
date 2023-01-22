export interface BaseUser {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone_number?: string;
}

export interface User extends BaseUser {
  id: number;
}
