import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/ThemeToggle';
import { Search, Settings, LogOut, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jobDescription');
    navigate('/');
  };

  const jobDescription = localStorage.getItem('jobDescription');

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 sm:h-16 items-center px-3 sm:px-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <SidebarTrigger />
          
          {jobDescription && (
            <Badge variant="outline" className="max-w-32 sm:max-w-md truncate text-xs">
              <Search className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">{jobDescription.substring(0, 40)}...</span>
              <span className="sm:hidden">{jobDescription.substring(0, 15)}...</span>
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-1 sm:space-x-4 ml-auto">
          <ThemeToggle />
          
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback className="text-xs">HR</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden lg:block">HR Manager</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;