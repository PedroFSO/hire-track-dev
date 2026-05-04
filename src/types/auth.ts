export interface User {
  id: string;
  name: string;
  email: string;
  role: 'developer' | 'admin';
  location: string;
  mainStack: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  location: string;
  mainStack: string;
}
