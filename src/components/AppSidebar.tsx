import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  BarChart3,
  Trophy,
  FileText,
  Activity,
  Search,
  Brain,
  MessageCircle,
  Library,
  Key,
  Settings,
  UserCog,
  Plus,
  Home,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Главная',
    url: '/',
    icon: Home,
  },
  {
    title: 'Дашборд',
    url: '/dashboard',
    icon: Users,
  },
];

const observabilityItems = [
  {
    title: 'Аналитика',
    url: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Рейтинг кандидатов',
    url: '/leaderboard',
    icon: Trophy,
  },
  {
    title: 'Логи поиска',
    url: '/logs',
    icon: FileText,
  },
  {
    title: 'Живые логи',
    url: '/live-logs',
    icon: Activity,
  },
];

const aiGatewayItems = [
  {
    title: 'Модели поиска',
    url: '/model-library',
    icon: Library,
  },
  {
    title: 'Исследование',
    url: '/model-discovery',
    icon: Search,
  },
  {
    title: 'Интеграции',
    url: '/integrations',
    icon: Brain,
  },
];

const promptEngineeringItems = [
  {
    title: 'Чат с кандидатами',
    url: '/chat',
    icon: MessageCircle,
  },
];

const configurationItems = [
  {
    title: 'Библиотека запросов',
    url: '/prompt-library',
    icon: Library,
  },
  {
    title: 'API ключи',
    url: '/api-keys',
    icon: Key,
  },
];

const adminItems = [
  {
    title: 'Панель администратора',
    url: '/admin',
    icon: UserCog,
  },
  {
    title: 'Настройки',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'hover:bg-sidebar-accent/50';

  const renderMenuGroup = (items: any[], label: string) => {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60 font-semibold">
          {label}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild className="h-8">
                  <NavLink to={item.url} className={getNavCls}>
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span className="text-sm">{item.title}</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-3 sm:p-4">
        {!collapsed && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
              </div>
              <span className="text-base sm:text-lg font-bold">TalentFinder</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm text-sidebar-foreground/60">Баланс</span>
                <Badge variant="outline" className="text-xs">
                  $0.00
                </Badge>
              </div>
              <Button size="sm" className="w-full h-7 sm:h-8 text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Пополнить
              </Button>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
            </div>
            <Button size="sm" className="w-7 h-7 sm:w-8 sm:h-8 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="p-1 sm:p-2">
        {renderMenuGroup(menuItems, 'Навигация')}
        {renderMenuGroup(observabilityItems, 'Аналитика')}
        {renderMenuGroup(aiGatewayItems, 'AI Gateway')}
        {renderMenuGroup(promptEngineeringItems, 'Взаимодействие')}
        {renderMenuGroup(configurationItems, 'Конфигурация')}
        {renderMenuGroup(adminItems, 'Администрирование')}
      </SidebarContent>
    </Sidebar>
  );
}