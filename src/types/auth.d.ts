export interface User {
  id?: string;
  email: string;
  password: string;
}
export interface AuthInfo {
  user: User;
  token: string;
}
