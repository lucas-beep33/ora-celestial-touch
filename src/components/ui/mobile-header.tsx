import { ReactNode } from 'react';
import { ArrowLeft, Search, Heart, Menu } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface MobileHeaderProps {
  title: string;
  onBack?: () => void;
  onSearch?: () => void;
  onFavorites?: () => void;
  onMenu?: () => void;
  rightAction?: ReactNode;
  className?: string;
}

export function MobileHeader({ 
  title, 
  onBack, 
  onSearch, 
  onFavorites, 
  onMenu, 
  rightAction,
  className 
}: MobileHeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-light shadow-divine px-4 py-3",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-white/20 h-8 w-8"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {onMenu && !onBack && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onMenu}
              className="text-primary-foreground hover:bg-white/20 h-8 w-8"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <h1 className="text-lg font-semibold text-primary-foreground truncate">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {onSearch && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onSearch}
              className="text-primary-foreground hover:bg-white/20 h-8 w-8"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
          
          {onFavorites && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onFavorites}
              className="text-primary-foreground hover:bg-white/20 h-8 w-8"
            >
              <Heart className="h-5 w-5" />
            </Button>
          )}
          
          {rightAction}
        </div>
      </div>
    </header>
  );
}