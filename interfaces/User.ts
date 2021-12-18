import { Role, User } from '@prisma/client';

export interface SafeUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string | null;
  email: string;
  role: Role;
}
