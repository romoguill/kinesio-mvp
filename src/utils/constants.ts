import { Pill, Book, UserSquare, LucideIcon } from 'lucide-react';

export type SidebarOption = {
  option: string;
  path: string;
  icon: LucideIcon;
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
];
