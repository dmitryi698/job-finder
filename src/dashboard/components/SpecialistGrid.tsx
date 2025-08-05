import React, { useState } from 'react';
import SpecialistCard from './SpecialistCard';
import SpecialistList from './SpecialistList';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, SortAsc, Users, Grid3X3, List } from 'lucide-react';

// Мокнутые данные для демонстрации
const mockSpecialists = [
  {
    id: '1',
    name: 'Анна Иванова',
    title: 'Senior Python Developer',
    location: 'Москва',
    experience: '5+ лет',
    matchPercentage: 95,
    skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    rating: 4.8,
    availability: 'available' as const,
  },
  {
    id: '2',
    name: 'Дмитрий Петров',
    title: 'Full Stack Python Developer',
    location: 'Санкт-Петербург',
    experience: '4+ лет',
    matchPercentage: 88,
    skills: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    rating: 4.6,
    availability: 'busy' as const,
  },
  {
    id: '3',
    name: 'Мария Сидорова',
    title: 'Backend Python Developer',
    location: 'Екатеринбург',
    experience: '3+ лет',
    matchPercentage: 82,
    skills: ['Python', 'Django', 'REST API', 'MySQL', 'Redis'],
    rating: 4.5,
    availability: 'available' as const,
  },
  {
    id: '4',
    name: 'Алексей Козлов',
    title: 'Python Developer',
    location: 'Новосибирск',
    experience: '6+ лет',
    matchPercentage: 91,
    skills: ['Python', 'Flask', 'PostgreSQL', 'Celery', 'Docker', 'Kubernetes'],
    rating: 4.7,
    availability: 'available' as const,
  },
  {
    id: '5',
    name: 'Елена Морозова',
    title: 'Senior Backend Developer',
    location: 'Казань',
    experience: '7+ лет',
    matchPercentage: 89,
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
    rating: 4.9,
    availability: 'unavailable' as const,
  },
  {
    id: '6',
    name: 'Владимир Николаев',
    title: 'Python Software Engineer',
    location: 'Ростов-на-Дону',
    experience: '4+ лет',
    matchPercentage: 78,
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    rating: 4.4,
    availability: 'available' as const,
  },
];

const SpecialistGrid = () => {
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  
  const sortedSpecialists = [...mockSpecialists].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchPercentage - a.matchPercentage;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const filteredSpecialists = sortedSpecialists.filter(specialist => {
    if (filterBy === 'available') return specialist.availability === 'available';
    if (filterBy === 'high-match') return specialist.matchPercentage >= 85;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Фильтры и сортировка */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">
              Найдено кандидатов: {filteredSpecialists.length}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            Среднее соответствие: {Math.round(filteredSpecialists.reduce((acc, s) => acc + s.matchPercentage, 0) / filteredSpecialists.length)}%
          </Badge>
        </div>

        <div className="flex items-center space-x-3">
          {/* Переключатель видов */}
          <div className="flex items-center border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'cards' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="px-3 py-1.5"
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Карточки
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3 py-1.5"
            >
              <List className="w-4 h-4 mr-1" />
              Список
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Фильтр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все кандидаты</SelectItem>
                <SelectItem value="available">Доступные</SelectItem>
                <SelectItem value="high-match">Высокое соответствие</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <SortAsc className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">По соответствию</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="name">По имени</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Контент в зависимости от выбранного вида */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSpecialists.map((specialist) => (
            <SpecialistCard key={specialist.id} specialist={specialist} />
          ))}
        </div>
      ) : (
        <SpecialistList specialists={filteredSpecialists} />
      )}

      {filteredSpecialists.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Кандидаты не найдены</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить фильтры или уточнить критерии поиска
          </p>
          <Button variant="outline">
            Изменить фильтры
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpecialistGrid;