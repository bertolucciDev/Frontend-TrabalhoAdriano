export const userRoles = [
  {
    label: 'Usuario',
    value: 'USER'
  },
  {
    label: 'Administrador',
    value: 'ADMIN'
  }
] as const;

export const userRolesEnum = ['USER', 'ADMIN'] as const;

export type UserRole = (typeof userRoles)[number]['value'];

export type UserRoles = UserRole | '*'