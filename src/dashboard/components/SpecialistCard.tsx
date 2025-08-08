import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Calendar, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Specialist } from '@/store/useSpecialistsStore';

interface SpecialistCardProps {
  specialist: Specialist;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ specialist }) => {
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
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={specialist.avatar} alt={specialist.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {specialist.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getAvailabilityColor(specialist.availability)} rounded-full border-2 border-card`}></div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{specialist.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{specialist.title}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span className="truncate">{specialist.location}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <div className={`text-lg font-bold ${getMatchColor(specialist.matchPercentage)}`}>
              {specialist.matchPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">соответствие</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium">Соответствие требованиям</span>
            <span className="text-xs text-muted-foreground">{specialist.matchPercentage}%</span>
          </div>
          <Progress 
            value={specialist.matchPercentage} 
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {specialist.experience}
          </div>
          <div className="flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current text-warning" />
            {specialist.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(specialist.availability)}`}></div>
            <span className="text-xs">{getAvailabilityText(specialist.availability)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
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

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => navigate(`/specialist/${specialist.id}`)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Подробнее
        </Button>
      </CardContent>
    </Card>
  );
};

export default SpecialistCard;