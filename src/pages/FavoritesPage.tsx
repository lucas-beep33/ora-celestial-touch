import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileHeader } from '@/components/ui/mobile-header';
import { PrayerCard } from '@/components/ui/prayer-card';
import { DevotionalCard } from '@/components/ui/devotional-card';
import { FavoritesService, UserFavorite } from '@/data/favorites';
import { prayers } from '@/data/prayers';
import { devotionals } from '@/data/devotionals';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);

  useEffect(() => {
    setFavorites(FavoritesService.getFavorites());
  }, []);

  const refreshFavorites = () => {
    setFavorites(FavoritesService.getFavorites());
  };

  const clearAllFavorites = () => {
    localStorage.removeItem('catholic_app_favorites');
    setFavorites([]);
  };

  const favoritePrayers = favorites
    .filter(fav => fav.type === 'prayer')
    .map(fav => prayers.find(p => p.id === fav.itemId))
    .filter(Boolean);

  const favoriteDevotionals = favorites
    .filter(fav => fav.type === 'devotional')
    .map(fav => devotionals.find(d => d.id === fav.itemId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Meus Favoritos"
        onBack={() => navigate('/')}
        rightAction={
          favorites.length > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFavorites}
              className="text-red-400 hover:text-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          ) : undefined
        }
      />

      <div className="p-4">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-muted-foreground mb-6">
              Comece a favoritar orações e devocionais para encontrá-los rapidamente aqui
            </p>
            <Button onClick={() => navigate('/')}>
              Explorar Orações
            </Button>
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">Todos ({favorites.length})</TabsTrigger>
              <TabsTrigger value="prayers">Orações ({favoritePrayers.length})</TabsTrigger>
              <TabsTrigger value="devotionals">Devocionais ({favoriteDevotionals.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {favorites
                .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
                .map((favorite) => {
                  if (favorite.type === 'prayer') {
                    const prayer = prayers.find(p => p.id === favorite.itemId);
                    return prayer ? (
                      <PrayerCard
                        key={favorite.id}
                        prayer={prayer}
                        onClick={() => navigate(`/prayer/${prayer.id}`)}
                      />
                    ) : null;
                  } else if (favorite.type === 'devotional') {
                    const devotional = devotionals.find(d => d.id === favorite.itemId);
                    return devotional ? (
                      <DevotionalCard
                        key={favorite.id}
                        devotional={devotional}
                        onClick={() => navigate(`/devotional/${devotional.id}`)}
                      />
                    ) : null;
                  }
                  return null;
                })}
            </TabsContent>

            <TabsContent value="prayers" className="space-y-4">
              {favoritePrayers.map((prayer) => (
                <PrayerCard
                  key={prayer!.id}
                  prayer={prayer!}
                  onClick={() => navigate(`/prayer/${prayer!.id}`)}
                />
              ))}
              {favoritePrayers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma oração favoritada ainda</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="devotionals" className="space-y-4">
              {favoriteDevotionals.map((devotional) => (
                <DevotionalCard
                  key={devotional!.id}
                  devotional={devotional!}
                  onClick={() => navigate(`/devotional/${devotional!.id}`)}
                />
              ))}
              {favoriteDevotionals.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhum devocional favoritado ainda</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Bottom spacing */}
        <div className="h-20" />
      </div>
    </div>
  );
}