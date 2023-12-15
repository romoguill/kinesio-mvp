import {
  Pill,
  Book,
  UserSquare,
  LucideIcon,
  ShieldAlert,
  PersonStanding,
} from 'lucide-react';
import { Role } from './types';

export type SidebarOption = {
  option: string;
  path: string;
  icon: LucideIcon;
  roles?: Role[];
};

export const SIDEBAR_OPTIONS: SidebarOption[] = [
  {
    option: 'Excercise Wiki',
    path: '/wiki',
    icon: Book,
  },
  {
    option: 'Patients',
    path: '/patients',
    icon: PersonStanding,
    roles: ['therapist'],
  },
  {
    option: 'Therapies',
    path: '/therapies',
    icon: Pill,
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
