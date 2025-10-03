import type { UserRole } from "@/constants/user-roles";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean
}