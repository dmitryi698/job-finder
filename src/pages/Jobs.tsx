import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Building2, Clock } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  postedDate: string;
  description: string;
  requirements: string[];
  technologies: string[];
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Москва",
    salary: "200 000 - 300 000 ₽",
    type: "Полная занятость",
    experience: "5+ лет",
    postedDate: "2 дня назад",
    description: "Ищем опытного фронтенд-разработчика для работы над современными веб-приложениями.",
    requirements: ["React", "TypeScript", "Redux", "CSS-in-JS"],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Санкт-Петербург",
    salary: "150 000 - 220 000 ₽",
    type: "Удаленно",
    experience: "3+ года",
    postedDate: "1 день назад",
    description: "Разработка высоконагруженных бэкенд-сервисов для мобильного приложения.",
    requirements: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis"]
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Екатеринбург",
    salary: "180 000 - 250 000 ₽",
    type: "Гибрид",
    experience: "4+ года",
    postedDate: "3 дня назад",
    description: "Построение и поддержка CI/CD пайплайнов, работа с облачной инфраструктурой.",
    requirements: ["Kubernetes", "Docker", "AWS", "Terraform"],
    technologies: ["Kubernetes", "Docker", "AWS", "Jenkins"]
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "DigitalAgency",
    location: "Новосибирск",
    salary: "120 000 - 180 000 ₽",
    type: "Полная занятость",
    experience: "2+ года",
    postedDate: "5 дней назад",
    description: "Разработка веб-приложений полного цикла для клиентов агентства.",
    requirements: ["React", "Node.js", "MongoDB", "Git"],
    technologies: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: "5",
    title: "Mobile Developer",
    company: "MobileFirst",
    location: "Казань",
    salary: "160 000 - 230 000 ₽",
    type: "Удаленно",
    experience: "3+ года",
    postedDate: "1 неделя назад",
    description: "Разработка кроссплатформенного мобильного приложения.",
    requirements: ["React Native", "JavaScript", "Redux", "Firebase"],
    technologies: ["React Native", "TypeScript", "Redux", "Firebase"]
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Удаленно":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    case "Гибрид":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
  }
};

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Список вакансий</h1>
          <p className="text-muted-foreground">
            Найдите идеальную работу среди {mockJobs.length} доступных вакансий
          </p>
        </div>

        <div className="grid gap-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge className={getTypeColor(job.type)}>
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {job.postedDate}
                  </div>
                </div>

                <p className="text-foreground">{job.description}</p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Технологии:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Требования:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req) => (
                        <Badge key={req} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 md:flex-none">
                    Откликнуться
                  </Button>
                  <Button variant="outline" className="flex-1 md:flex-none">
                    Подробнее
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;