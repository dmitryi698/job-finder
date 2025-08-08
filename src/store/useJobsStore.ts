import { create } from 'zustand';

export interface Job {
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

interface JobsState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  getJobById: (id: string) => Job | undefined;
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

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,
  
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ jobs: mockJobs, loading: false });
    } catch (error) {
      set({ error: 'Ошибка загрузки вакансий', loading: false });
    }
  },
  
  getJobById: (id: string) => {
    return get().jobs.find(job => job.id === id);
  }
}));