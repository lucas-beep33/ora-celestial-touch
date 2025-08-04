import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, Cross, BookOpen, Users, Lightbulb, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategoryCard } from '@/components/ui/category-card';
import { PrayerCard } from '@/components/ui/prayer-card';
import { DevotionalCard } from '@/components/ui/devotional-card';
import { MobileHeader } from '@/components/ui/mobile-header';
import { prayers, getPrayersByCategory } from '@/data/prayers';
import { getTodayDevotional } from '@/data/devotionals';
import { FavoritesService } from '@/data/favorites';
import jesusImage from '@/assets/jesus-christ-hero.jpg';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const todayDevotional = getTodayDevotional();
  const recentFavorites = FavoritesService.getRecentFavorites(3);
  
  // Oração do dia (primeira oração tradicional)
  const prayerOfTheDay = prayers.find(p => p.category === 'traditional') || prayers[0];

  const categories = [
    {
      id: 'traditional',
      title: 'Tradicionais',
      description: 'Orações fundamentais da fé católica',
      icon: Cross,
      gradient: 'bg-gradient-to-br from-primary to-primary-dark',
      count: getPrayersByCategory('traditional').length
    },
    {
      id: 'powerful',
      title: 'Poderosas',
      description: 'Orações de proteção e cura',
      icon: Lightbulb,
      gradient: 'bg-gradient-to-br from-golden-soft to-orange-500',
      count: getPrayersByCategory('powerful').length
    },
    {
      id: 'saints',
      title: 'Santos',
      description: 'Orações aos santos e santas',
      icon: Users,
      gradient: 'bg-gradient-to-br from-purple-500 to-purple-700',
      count: getPrayersByCategory('saints').length
    },
    {
      id: 'situation',
      title: 'Por Situação',
      description: 'Orações para momentos específicos',
      icon: Heart,
      gradient: 'bg-gradient-to-br from-green-500 to-green-700',
      count: getPrayersByCategory('situation').length
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <MobileHeader 
        title="Orações Católicas"
        onFavorites={() => navigate('/favorites')}
        onMenu={() => navigate('/support')}
      />

      {/* Hero Section with Jesus Image */}
      <div className="relative h-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${jesusImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative h-full flex flex-col justify-end p-6">
          <h1 className="text-white text-2xl font-bold mb-2">
            Paz e Bênçãos
          </h1>
          <p className="text-white/90 text-sm">
            Fortaleça sua fé através da oração
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-6 relative z-10">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar orações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 bg-white shadow-gentle border-0 h-12"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="h-12 px-6 bg-primary hover:bg-primary-dark shadow-gentle"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>

        {/* Oração do Dia */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Oração do Dia
          </h2>
          <PrayerCard 
            prayer={prayerOfTheDay}
            onClick={() => navigate(`/prayer/${prayerOfTheDay.id}`)}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
          />
        </section>

        {/* Categorias */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Categorias de Orações
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
                count={category.count}
                gradient={category.gradient}
                onClick={() => navigate(`/category/${category.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Bíblia Sagrada */}
        <section>
          <CategoryCard
            title="Bíblia Sagrada"
            description="Palavra de Deus para sua meditação"
            icon={BookOpen}
            gradient="bg-gradient-to-br from-indigo-500 to-indigo-700"
            onClick={() => navigate('/bible')}
            className="w-full"
          />
        </section>

        {/* Devocional de Hoje */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Devocional de Hoje
          </h2>
          <DevotionalCard
            devotional={todayDevotional}
            onClick={() => navigate(`/devotional/${todayDevotional.id}`)}
          />
        </section>

        {/* Favoritos Recentes */}
        {recentFavorites.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-foreground">
                Favoritos Recentes
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/favorites')}
                className="text-primary"
              >
                Ver todos
              </Button>
            </div>
            <div className="space-y-3">
              {recentFavorites.slice(0, 2).map((favorite) => {
                if (favorite.type === 'prayer') {
                  const prayer = prayers.find(p => p.id === favorite.itemId);
                  return prayer ? (
                    <PrayerCard
                      key={favorite.id}
                      prayer={prayer}
                      onClick={() => navigate(`/prayer/${prayer.id}`)}
                    />
                  ) : null;
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/* Bottom spacing for mobile navigation */}
        <div className="h-20" />
      </div>
    </div>
  );
}