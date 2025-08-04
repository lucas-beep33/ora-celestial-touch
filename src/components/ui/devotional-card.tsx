import { Card } from './card';
import { Button } from './button';
import { Heart, Share2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Devotional } from '@/data/devotionals';
import { FavoritesService } from '@/data/favorites';
import { useState } from 'react';

interface DevotionalCardProps {
  devotional: Devotional;
  onClick?: () => void;
  className?: string;
}

export function DevotionalCard({ devotional, onClick, className }: DevotionalCardProps) {
  const [isFavorited, setIsFavorited] = useState(
    FavoritesService.isFavorite('devotional', devotional.id)
  );

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      FavoritesService.removeFavorite('devotional', devotional.id);
    } else {
      FavoritesService.addFavorite('devotional', devotional.id);
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const content = `${devotional.theme}\n\n"${devotional.verse}" - ${devotional.reference}\n\n${devotional.reflection}\n\n${devotional.prayer}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Devocional: ${devotional.theme}`,
        text: content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(content);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: 'long',
      year: 'numeric' 
    });
  };

  return (
    <Card 
      className={cn(
        "bg-gradient-to-br from-golden-soft/10 to-golden-soft/5 border-golden-soft/20 shadow-gentle hover:shadow-golden transition-all duration-300 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {formatDate(devotional.date)}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-3 text-lg leading-tight">
              {devotional.theme}
            </h3>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavorite}
            className={cn(
              "h-8 w-8 rounded-full",
              isFavorited 
                ? "text-red-500 hover:text-red-600" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
          </Button>
        </div>

        <div className="space-y-3">
          <blockquote className="italic text-primary font-medium border-l-4 border-primary/30 pl-4 py-2">
            "{devotional.verse}"
            <cite className="block text-sm text-muted-foreground mt-1 not-italic">
              - {devotional.reference}
            </cite>
          </blockquote>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {devotional.reflection}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="h-8 px-2 text-xs"
          >
            <Share2 className="h-3 w-3 mr-1" />
            Compartilhar
          </Button>
          
          <span className="text-xs text-primary font-medium">
            Ler devocional →
          </span>
        </div>
      </div>
    </Card>
  );
}