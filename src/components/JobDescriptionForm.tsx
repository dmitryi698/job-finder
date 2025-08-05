import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescriptionForm = () => {
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobDescription.trim()) {
      // Сохраняем описание вакансии в localStorage для передачи на следующую страницу
      localStorage.setItem('jobDescription', jobDescription);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
              <Search className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Найдите идеального кандидата
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Опишите вашу вакансию, и мы найдем специалистов, которые точно соответствуют вашим требованиям
          </p>
        </div>

        <Card className="shadow-xl border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Описание вакансии</CardTitle>
            <CardDescription>
              Введите подробное описание позиции, требования к кандидату и условия работы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Textarea
                  placeholder="Например: Ищем Senior Python разработчика для работы с микросервисами. Требования: опыт работы с Django, FastAPI, PostgreSQL, Redis, Docker. Знание архитектурных паттернов, опыт с облачными платформами (AWS/GCP). Удаленная работа, гибкий график..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px] resize-none text-base leading-relaxed"
                  required
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold group"
                  disabled={!jobDescription.trim()}
                >
                  Найти кандидатов
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold">Умный поиск</h3>
            <p className="text-sm text-muted-foreground">
              AI анализирует требования и находит наиболее подходящих специалистов
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto">
              <ArrowRight className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-semibold">Быстрый результат</h3>
            <p className="text-sm text-muted-foreground">
              Получите список кандидатов за несколько секунд
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto">
              <ArrowRight className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-semibold">Детальный анализ</h3>
            <p className="text-sm text-muted-foreground">
              Посмотрите, как именно каждый кандидат соответствует вашим требованиям
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionForm;