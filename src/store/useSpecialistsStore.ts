import { create } from 'zustand';

export interface Specialist {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
  experience: string;
  rating: number;
  matchPercentage: number;
  availability: string;
  avatar: string;
  email: string;
  phone: string;
  education: {
    degree: string;
    university: string;
    year: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
  }[];
}

interface SpecialistsState {
  specialists: Specialist[];
  loading: boolean;
  error: string | null;
  fetchSpecialists: () => Promise<void>;
  getSpecialistById: (id: string) => Specialist | undefined;
}

const mockSpecialists: Specialist[] = [
  {
    id: "1",
    name: "Анна Петрова",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Москва",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Tailwind CSS"],
    experience: "5 лет",
    rating: 4.8,
    matchPercentage: 95,
    availability: "Готов к собеседованию",
    avatar: "/placeholder.svg",
    email: "anna.petrova@email.com",
    phone: "+7 (999) 123-45-67",
    education: [
      {
        degree: "Магистр информатики",
        university: "МГУ им. Ломоносова",
        year: "2019"
      }
    ],
    projects: [
      {
        title: "E-commerce платформа",
        description: "Разработка современной платформы электронной коммерции с использованием React и Node.js",
        technologies: ["React", "Node.js", "PostgreSQL", "Redis"]
      }
    ]
  },
  {
    id: "2",
    name: "Михаил Сидоров",
    title: "Backend Developer",
    company: "StartupXYZ",
    location: "Санкт-Петербург",
    skills: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    experience: "4 года",
    rating: 4.6,
    matchPercentage: 88,
    availability: "Рассматривает предложения",
    avatar: "/placeholder.svg",
    email: "mikhail.sidorov@email.com",
    phone: "+7 (999) 234-56-78",
    education: [
      {
        degree: "Бакалавр программной инженерии",
        university: "СПбГУ",
        year: "2020"
      }
    ],
    projects: [
      {
        title: "Микросервисная архитектура",
        description: "Проектирование и разработка микросервисной архитектуры для высоконагруженного приложения",
        technologies: ["Node.js", "Docker", "Kubernetes", "PostgreSQL"]
      }
    ]
  },
  {
    id: "3",
    name: "Елена Козлова",
    title: "Full Stack Developer",
    company: "WebStudio",
    location: "Екатеринбург",
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
    experience: "3 года",
    rating: 4.4,
    matchPercentage: 82,
    availability: "Активно ищет работу",
    avatar: "/placeholder.svg",
    email: "elena.kozlova@email.com",
    phone: "+7 (999) 345-67-89",
    education: [
      {
        degree: "Бакалавр информационных технологий",
        university: "УрФУ",
        year: "2021"
      }
    ],
    projects: [
      {
        title: "CRM система",
        description: "Полнофункциональная CRM система для управления клиентами и продажами",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
      }
    ]
  },
  {
    id: "4",
    name: "Дмитрий Волков",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Новосибирск",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins"],
    experience: "6 лет",
    rating: 4.9,
    matchPercentage: 91,
    availability: "Готов к собеседованию",
    avatar: "/placeholder.svg",
    email: "dmitry.volkov@email.com",
    phone: "+7 (999) 456-78-90",
    education: [
      {
        degree: "Магистр системного администрирования",
        university: "НГТУ",
        year: "2018"
      }
    ],
    projects: [
      {
        title: "Облачная инфраструктура",
        description: "Построение отказоустойчивой облачной инфраструктуры для стартапа",
        technologies: ["AWS", "Kubernetes", "Terraform", "Docker"]
      }
    ]
  }
];

export const useSpecialistsStore = create<SpecialistsState>((set, get) => ({
  specialists: [],
  loading: false,
  error: null,
  
  fetchSpecialists: async () => {
    set({ loading: true, error: null });
    try {
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ specialists: mockSpecialists, loading: false });
    } catch (error) {
      set({ error: 'Ошибка загрузки специалистов', loading: false });
    }
  },
  
  getSpecialistById: (id: string) => {
    return get().specialists.find(specialist => specialist.id === id);
  }
}));