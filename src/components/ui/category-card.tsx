import { Card } from './card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  count?: number;
  gradient: string;
  onClick?: () => void;
  className?: string;
}

export function CategoryCard({ 
  title, 
  description, 
  icon: Icon, 
  count, 
  gradient,
  onClick, 
  className 
}: CategoryCardProps) {
  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-divine border-0",
        gradient,
        className
      )}
      onClick={onClick}
    >
      <div className="relative p-6 h-32 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1 text-lg">
              {title}
            </h3>
            <p className="text-white/80 text-sm leading-tight">
              {description}
            </p>
          </div>
          <Icon className="h-8 w-8 text-white/90 flex-shrink-0 ml-3" />
        </div>
        
        {count !== undefined && (
          <div className="flex justify-end">
            <span className="text-white/70 text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
              {count} orações
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}