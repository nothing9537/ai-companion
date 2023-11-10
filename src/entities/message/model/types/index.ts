import { Role } from '@prisma/client';

export interface AppMessage {
  role: Role;
  content?: string;
  imageUrl?: string;
  isLoading?: boolean;
}
