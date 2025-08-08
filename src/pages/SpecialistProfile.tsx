import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useSpecialistsStore } from '@/store/useSpecialistsStore';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Star, 
  Mail, 
  Phone, 
  Award,
  BookOpen,
  Clock,
  Users,
  TrendingUp,
  Download
} from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/dashboard/components/Header';

interface SpecialistData {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  location: string;
  experience: string;
  matchPercentage: number;
  skills: string[];
  rating: number;
  availability: 'available' | 'busy' | 'unavailable';
  email: string;
  phone: string;
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  certifications: string[];
  languages: Array<{
    language: string;
    level: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    duration: string;
  }>;
  workHistory: Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
}

// Mock data for demonstration
const mockSpecialist: SpecialistData = {
  id: '4',
  name: 'Алексей Иванов',
  title: 'Senior Frontend Developer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  location: 'Москва, Россия',
  experience: '5+ лет опыта',
  matchPercentage: 92,
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker'],
  rating: 4.8,
  availability: 'available',
  email: 'alexey.ivanov@example.com',
  phone: '+7 (999) 123-45-67',
  summary: 'Опытный Frontend разработчик с более чем 5-летним опытом создания современных веб-приложений. Специализируюсь на React, TypeScript и современных технологиях фронтенда. Имею опыт работы в команде и руководства проектами.',
  education: [
    {
      degree: 'Магистр компьютерных наук',
      institution: 'МГУ им. М.В. Ломоносова',
      year: '2018'
    },
    {
      degree: 'Бакалавр информационных технологий',
      institution: 'МГТУ им. Н.Э. Баумана',
      year: '2016'
    }
  ],
  certifications: [
    'AWS Certified Developer',
    'Google Cloud Professional',
    'React Professional Certificate'
  ],
  languages: [
    { language: 'Русский', level: 'Родной' },
    { language: 'Английский', level: 'Свободный' },
    { language: 'Немецкий', level: 'Базовый' }
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      description: 'Крупная платформа электронной коммерции с микросервисной архитектурой',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      duration: '8 месяцев'
    },
    {
      name: 'Mobile Banking App',
      description: 'Мобильное приложение для банковских операций',
      technologies: ['React Native', 'Redux', 'GraphQL'],
      duration: '6 месяцев'
    }
  ],
  workHistory: [
    {
      position: 'Senior Frontend Developer',
      company: 'Яндекс',
      period: '2021 - настоящее время',
      description: 'Разработка и поддержка веб-приложений, руководство командой из 4 разработчиков'
    },
    {
      position: 'Frontend Developer',
      company: 'Mail.ru Group',
      period: '2019 - 2021',
      description: 'Разработка пользовательских интерфейсов для различных продуктов компании'
    }
  ]
};

const SpecialistProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { specialists, fetchSpecialists, getSpecialistById } = useSpecialistsStore();
  
  useEffect(() => {
    if (specialists.length === 0) {
      fetchSpecialists();
    }
  }, [specialists.length, fetchSpecialists]);
  
  const specialist = id ? getSpecialistById(id) : null;

  if (!specialist) {
    return (
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex justify-center items-center">
            <div className="text-muted-foreground">Специалист не найден</div>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success';
      case 'busy':
        return 'bg-warning';
      case 'unavailable':
        return 'bg-destructive';
      default:
        return 'bg-muted';
    }
  };

  const getAvailabilityText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Доступен для проектов';
      case 'busy':
        return 'Занят';
      case 'unavailable':
        return 'Недоступен';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="container mx-auto p-4 lg:p-6 space-y-6">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к списку
              </Button>

              {/* Header Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Avatar and Basic Info */}
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="relative">
                        <Avatar className="w-32 h-32">
                          <AvatarImage src={specialist.avatar} alt={specialist.name} />
                          <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {specialist.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-2 -right-2 w-6 h-6 ${getAvailabilityColor(specialist.availability)} rounded-full border-4 border-card`}></div>
                      </div>
                      <div className="text-center lg:text-left mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(specialist.availability)}`}></div>
                          <span className="text-sm">{getAvailabilityText(specialist.availability)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <h1 className="text-3xl font-bold mb-2">{specialist.name}</h1>
                          <p className="text-xl text-muted-foreground mb-3">{specialist.title}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {specialist.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {specialist.experience}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 fill-current text-warning" />
                              {specialist.rating.toFixed(1)} рейтинг
                            </div>
                          </div>

                           <p className="text-muted-foreground leading-relaxed">
                             Опытный разработчик с {specialist.experience} опыта в области {specialist.title}. 
                             Специализируется на современных технологиях и имеет высокий рейтинг среди коллег.
                           </p>
                        </div>

                        {/* Match Score */}
                        <div className="bg-muted/50 rounded-lg p-4 text-center lg:min-w-[200px]">
                          <div className="text-3xl font-bold text-success mb-2">
                            {specialist.matchPercentage}%
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Соответствие требованиям</p>
                          <Progress value={specialist.matchPercentage} className="mb-3" />
                          <Button className="w-full" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Скачать CV
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact and Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Skills */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Навыки и технологии
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {specialist.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Work History */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        Опыт работы
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{specialist.title}</h4>
                            <p className="text-muted-foreground">{specialist.company}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{specialist.experience}</span>
                        </div>
                        <p className="text-sm">
                          Разработка и поддержка веб-приложений с использованием современных технологий. 
                          Участие в проектировании архитектуры и код-ревью.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Projects */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Ключевые проекты
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {specialist.projects.map((project, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{project.title}</h4>
                            <span className="text-sm text-muted-foreground">6 месяцев</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          {index < specialist.projects.length - 1 && <Separator className="mt-4" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  {/* Contact */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Контактная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">{specialist.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">{specialist.phone}</span>
                      </div>
                      <Separator />
                      <Button className="w-full">
                        Связаться
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Education */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Образование
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {specialist.education.map((edu, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-sm">{edu.degree}</h4>
                          <p className="text-sm text-muted-foreground">{edu.university}</p>
                          <p className="text-xs text-muted-foreground">{edu.year}</p>
                          {index < specialist.education.length - 1 && <Separator className="mt-3" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Award className="w-5 h-5 mr-2" />
                        Сертификаты
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge variant="outline" className="block text-center py-2">
                          AWS Certified Developer
                        </Badge>
                        <Badge variant="outline" className="block text-center py-2">
                          React Professional Certificate
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Languages */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Языки</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Русский</span>
                        <span className="text-sm text-muted-foreground">Родной</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Английский</span>
                        <span className="text-sm text-muted-foreground">Свободный</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SpecialistProfile;