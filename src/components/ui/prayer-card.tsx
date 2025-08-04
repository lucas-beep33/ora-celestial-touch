import { Card } from './card';
import { Button } from './button';
import { Heart, Share2, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Prayer } from '@/data/prayers';
import { FavoritesService } from '@/data/favorites';
import { useState } from 'react';

interface PrayerCardProps {
  prayer: Prayer;
  onClick?: () => void;
  showFullContent?: boolean;
  className?: string;
}

export function PrayerCard({ prayer, onClick, showFullContent = false, className }: PrayerCardProps) {
  const [isFavorited, setIsFavorited] = useState(
    FavoritesService.isFavorite('prayer', prayer.id)
  );

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorited) {
      FavoritesService.removeFavorite('prayer', prayer.id);
    } else {
      FavoritesService.addFavorite('prayer', prayer.id);
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: prayer.title,
        text: prayer.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${prayer.title}\n\n${prayer.content}`);
    }
  };

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(prayer.content);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const categoryColors = {
    traditional: 'from-primary/10 to-primary/5 border-primary/20',
    powerful: 'from-golden-soft/10 to-golden-soft/5 border-golden-soft/20',
    saints: 'from-purple-100 to-purple-50 border-purple-200',
    situation: 'from-green-100 to-green-50 border-green-200'
  };

  const categoryLabels = {
    traditional: 'Tradicional',
    powerful: 'Poderosa',
    saints: 'Santos',
    situation: 'Por Situação'
  };

  return (
    <Card 
      className={cn(
        "bg-gradient-to-br border-0 shadow-gentle hover:shadow-divine transition-all duration-300 cursor-pointer",
        categoryColors[prayer.category],
        className
      )}
      onClick={onClick}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {categoryLabels[prayer.category]}
              </span>
              {prayer.subcategory && (
                <span className="text-xs text-muted-foreground">
                  {prayer.subcategory}
                </span>
              )}
            </div>
            <h3 className="font-semibold text-foreground mb-2 leading-tight">
              {prayer.title}
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

        <p className={cn(
          "text-sm text-muted-foreground leading-relaxed",
          !showFullContent && "line-clamp-3"
        )}>
          {prayer.content}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayAudio}
              className="h-8 px-2 text-xs"
            >
              <Play className="h-3 w-3 mr-1" />
              Ouvir
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 px-2 text-xs"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Compartilhar
            </Button>
          </div>
          
          {!showFullContent && (
            <span className="text-xs text-primary font-medium">
              Ler mais →
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}