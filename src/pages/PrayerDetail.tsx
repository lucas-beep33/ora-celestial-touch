import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Share2, Play, Pause, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MobileHeader } from '@/components/ui/mobile-header';
import { prayers, getPrayerById } from '@/data/prayers';
import { FavoritesService } from '@/data/favorites';
import { cn } from '@/lib/utils';

export default function PrayerDetail() {
  const { prayerId } = useParams<{ prayerId: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const prayer = prayerId ? getPrayerById(prayerId) : null;

  if (!prayer) {
    return (
      <div className="min-h-screen bg-soft-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Oração não encontrada</h2>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  useState(() => {
    setIsFavorited(FavoritesService.isFavorite('prayer', prayer.id));
  });

  const handleFavorite = () => {
    if (isFavorited) {
      FavoritesService.removeFavorite('prayer', prayer.id);
    } else {
      FavoritesService.addFavorite('prayer', prayer.id);
    }
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
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

  const handlePlayAudio = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(prayer.content);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const categoryLabels = {
    traditional: 'Tradicional',
    powerful: 'Poderosa',
    saints: 'Santos',
    situation: 'Por Situação'
  };

  const categoryColors = {
    traditional: 'bg-primary/10 text-primary',
    powerful: 'bg-golden-soft/10 text-orange-700',
    saints: 'bg-purple-100 text-purple-700',
    situation: 'bg-green-100 text-green-700'
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title={prayer.title}
        onBack={() => navigate(-1)}
      />

      <div className="p-4 space-y-6">
        {/* Prayer Header */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn(
                    "text-xs font-medium px-3 py-1 rounded-full",
                    categoryColors[prayer.category]
                  )}>
                    {categoryLabels[prayer.category]}
                  </span>
                  {prayer.subcategory && (
                    <span className="text-xs text-muted-foreground">
                      {prayer.subcategory}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {prayer.title}
                </h1>
                <div className="flex flex-wrap gap-1">
                  {prayer.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
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
                onClick={handlePlayAudio}
                className="flex-1"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? 'Pausar' : 'Ouvir'}
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

        {/* Prayer Content */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Oração</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed whitespace-pre-line text-base">
                {prayer.content}
              </p>
            </div>
          </div>
        </Card>

        {/* Context */}
        {prayer.context && (
          <Card className="bg-white shadow-gentle border-0">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Contexto
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {prayer.context}
              </p>
            </div>
          </Card>
        )}

        {/* Related Prayers */}
        <Card className="bg-white shadow-gentle border-0">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Outras Orações da Categoria
            </h2>
            <div className="space-y-2">
              {prayers
                .filter(p => p.category === prayer.category && p.id !== prayer.id)
                .slice(0, 3)
                .map((relatedPrayer) => (
                  <button
                    key={relatedPrayer.id}
                    onClick={() => navigate(`/prayer/${relatedPrayer.id}`)}
                    className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <h3 className="font-medium text-foreground">{relatedPrayer.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {relatedPrayer.content}
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