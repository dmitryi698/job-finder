import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Подходящие кандидаты</h1>
          <p className="text-muted-foreground">
            Найдены специалисты, соответствующие вашим требованиям
          </p>
        </div>
        <SpecialistGrid />
      </main>
    </div>
  );
};

export default Dashboard;