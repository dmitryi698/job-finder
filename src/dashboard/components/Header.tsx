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
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          
          {jobDescription && (
            <Badge variant="outline" className="max-w-md truncate">
              <Search className="w-3 h-3 mr-1" />
              {jobDescription.substring(0, 40)}...
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <ThemeToggle />
          
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>HR</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:block">HR Manager</span>
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