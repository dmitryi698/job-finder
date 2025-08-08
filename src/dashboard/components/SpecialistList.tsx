import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Specialist } from '@/store/useSpecialistsStore';

interface SpecialistListProps {
  specialists: Specialist[];
}

const SpecialistList: React.FC<SpecialistListProps> = ({ specialists }) => {
  const navigate = useNavigate();

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'Готов к собеседованию':
        return 'bg-success';
      case 'Рассматривает предложения':
        return 'bg-warning';
      case 'Активно ищет работу':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const getAvailabilityText = (status: string) => {
    return status;
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="border border-border rounded-lg bg-card/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="font-semibold">Кандидат</TableHead>
            <TableHead className="font-semibold">Позиция</TableHead>
            <TableHead className="font-semibold">Локация</TableHead>
            <TableHead className="font-semibold">Соответствие</TableHead>
            <TableHead className="font-semibold">Навыки</TableHead>
            <TableHead className="font-semibold">Статус</TableHead>
            <TableHead className="font-semibold">Рейтинг</TableHead>
            <TableHead className="font-semibold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialists.map((specialist) => (
            <TableRow 
              key={specialist.id} 
              className="border-border hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => navigate(`/specialist/${specialist.id}`)}
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={specialist.avatar} alt={specialist.name} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {specialist.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getAvailabilityColor(specialist.availability)} rounded-full border-2 border-card`}></div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{specialist.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {specialist.experience}
                    </div>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="text-sm font-medium">{specialist.title}</div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 mr-1" />
                  {specialist.location}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-sm font-semibold ${getMatchColor(specialist.matchPercentage)}`}>
                        {specialist.matchPercentage}%
                      </span>
                    </div>
                    <Progress value={specialist.matchPercentage} className="h-1.5 w-20" />
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex flex-wrap gap-1 max-w-48">
                  {specialist.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs py-0 px-2">
                      {skill}
                    </Badge>
                  ))}
                  {specialist.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs py-0 px-2">
                      +{specialist.skills.length - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(specialist.availability)}`}></div>
                  <span className="text-sm">{getAvailabilityText(specialist.availability)}</span>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center text-sm">
                  <Star className="w-3 h-3 mr-1 fill-current text-warning" />
                  {specialist.rating.toFixed(1)}
                </div>
              </TableCell>
              
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/specialist/${specialist.id}`);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SpecialistList;