import { Pill, Book, UserSquare, LucideIcon, ShieldAlert } from 'lucide-react';
import { Role } from './types';

export type SidebarOption = {
  option: string;
  path: string;
  icon: LucideIcon;
  roles?: Role[];
};

export const SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    option: 'Therapies',
    path: '/therapies',
    icon: Pill,
  },
  {
    option: 'Excercise Wiki',
    path: '/wiki',
    icon: Book,
  },
  {
    option: 'Account',
    path: '/account',
    icon: UserSquare,
  },
  {
    option: 'Admin',
    path: '/admin',
    icon: ShieldAlert,
    roles: ['admin'],
  },
];
