import React, { useState, useEffect } from 'react';
import SpecialistCard from './SpecialistCard';
import SpecialistList from './SpecialistList';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, SortAsc, Users, Grid3X3, List } from 'lucide-react';
import { useSpecialistsStore } from '@/store/useSpecialistsStore';

const SpecialistGrid = () => {
  const { specialists, loading, error, fetchSpecialists } = useSpecialistsStore();
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');

  useEffect(() => {
    fetchSpecialists();
  }, [fetchSpecialists]);
  
  const sortedSpecialists = [...specialists].sort((a, b) => {
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
    if (filterBy === 'available') return specialist.availability === 'Готов к собеседованию';
    if (filterBy === 'high-match') return specialist.matchPercentage >= 85;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-muted-foreground">Загрузка специалистов...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Фильтры и сортировка */}
      <div className="flex flex-col gap-4">
        {/* Статистика */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium">
              Найдено: {filteredSpecialists.length}
            </span>
          </div>
          <Badge variant="outline" className="text-xs w-fit">
            Среднее соответствие: {Math.round(filteredSpecialists.reduce((acc, s) => acc + s.matchPercentage, 0) / filteredSpecialists.length)}%
          </Badge>
        </div>

        {/* Элементы управления */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Переключатель видов */}
          <div className="flex items-center border border-border rounded-lg p-1 w-fit">
            <Button
              variant={viewMode === 'cards' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm"
            >
              <Grid3X3 className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Карточки</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm"
            >
              <List className="w-4 h-4 sm:mr-1" />
              <span className="hidden sm:inline">Список</span>
            </Button>
          </div>

          {/* Фильтры и сортировка */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full sm:w-40">
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
                <SelectTrigger className="w-full sm:w-40">
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
      </div>

      {/* Контент в зависимости от выбранного вида */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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