export enum Role {
  ADMIN,
  USER,
}

export interface AuthUser {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  image: string;
  email: string;
  password: string;
  role: Role;
  bio: string;
}

export interface UserState {
  authUser: AuthUser | null;
}
