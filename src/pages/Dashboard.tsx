import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import Header from '@/dashboard/components/Header';
import SpecialistGrid from '@/dashboard/components/SpecialistGrid';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем аутентификацию
    const user = localStorage.getItem('user');
    const jobDescription = localStorage.getItem('jobDescription');
    
    if (!user || !jobDescription) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="flex-1 px-3 py-4 sm:px-6 sm:py-8">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Подходящие кандидаты</h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Найдены специалисты, соответствующие вашим требованиям
              </p>
            </div>
            <SpecialistGrid />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;