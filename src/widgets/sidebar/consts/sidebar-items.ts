import { Home, Plus, Settings } from 'lucide-react';
import { SidebarItem } from '../types';

export const SideBarItems: SidebarItem[] = [
  {
    icon: Home,
    href: '/',
    label: 'Home',
    pro: false,
  },
  {
    icon: Plus,
    href: '/companion/new',
    label: 'Create',
    pro: true,
  },
  {
    icon: Settings,
    href: '/settings',
    label: 'Settings',
    pro: false,
  },
];
