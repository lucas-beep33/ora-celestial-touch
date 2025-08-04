import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileHeader } from '@/components/ui/mobile-header';
import { devotionals } from '@/data/devotionals';
import { FavoritesService } from '@/data/favorites';
import { cn } from '@/lib/utils';

export default function DevotionalDetail() {
  const { devotionalId } = useParams<{ devotionalId: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  const devotional = devotionals.find(d => d.id === devotionalId);

  if (!devotional) {
    return (
      <div className="min-h-screen bg-soft-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Devocional não encontrado</h2>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  useState(() => {
    setIsFavorited(FavoritesService.isFavorite('devotional', devotional.id));
  });

  const handleFavorite = () => {
    if (isFavorited) {
      FavoritesService.removeFavorite('devotional', devotional.id);
    } else {
      FavoritesService.addFavorite('devotional', devotional.id);
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
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
      weekday: 'long',
      day: '2-digit', 
      month: 'long',
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Devocional Diário"
        onBack={() => navigate(-1)}
      />

      <div className="p-4 space-y-6">
        {/* Devotional Header */}
        <Card className="bg-gradient-to-br from-golden-soft/10 to-golden-soft/5 border-golden-soft/20 shadow-golden">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                {formatDate(devotional.date)}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {devotional.theme}
            </h1>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={cn(
                  "flex-1",
                  isFavorited && "bg-red-50 border-red-200 text-red-600"
                )}
              >
                <Heart className={cn("h-4 w-4 mr-2", isFavorited && "fill-current")} />
                {isFavorited ? 'Favoritado' : 'Favoritar'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </Card>

        {/* Bible Verse */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Versículo do Dia
            </h2>
            <blockquote className="text-lg italic text-primary font-medium border-l-4 border-primary/30 pl-6 py-4 mb-4">
              "{devotional.verse}"
            </blockquote>
            <cite className="text-sm text-muted-foreground font-medium">
              - {devotional.reference}
            </cite>
          </div>
        </Card>

        {/* Reflection */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Reflexão</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed text-base">
                {devotional.reflection}
              </p>
            </div>
          </div>
        </Card>

        {/* Prayer */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-gentle">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Oração</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed text-base italic">
                {devotional.prayer}
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation to Other Devotionals */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Outros Devocionais
            </h2>
            <div className="space-y-2">
              {devotionals
                .filter(d => d.id !== devotional.id)
                .slice(0, 3)
                .map((otherDevotional) => (
                  <button
                    key={otherDevotional.id}
                    onClick={() => navigate(`/devotional/${otherDevotional.id}`)}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(otherDevotional.date)}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground">{otherDevotional.theme}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {otherDevotional.reflection}
                    </p>
                  </button>
                ))}
            </div>
          </div>
        </Card>

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}